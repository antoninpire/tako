import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signin');
	return {};
};
