import { auth } from '$lib/server/lucia';
import { DatabaseError } from '@planetscale/database';
import { fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { z } from 'zod';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

const schema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.max(255, 'Password must be at most 255 characters long')
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const body = { email, password };

		const parsedBody = schema.safeParse(body);

		if (!parsedBody.success)
			return fail(400, {
				message: parsedBody.error.errors[0].message ?? 'Invalid request'
			});

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: parsedBody.data.email.toLowerCase(),
					password: parsedBody.data.password
				},
				attributes: {
					email: parsedBody.data.email
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof DatabaseError) {
				return fail(403, {
					message: 'Email already in use'
				});
			}

			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
