import { auth } from '$lib/server/lucia';
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { z } from 'zod';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'Password cannot be empty')
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const body = {
			email,
			password
		};

		const parsedBody = schema.safeParse(body);

		if (!parsedBody.success)
			return fail(400, {
				message: parsedBody.error.errors[0].message ?? 'Invalid request'
			});

		try {
			const key = await auth.useKey(
				'email',
				parsedBody.data.email.toLowerCase(),
				parsedBody.data.password
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: 'Incorrect email or password'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
