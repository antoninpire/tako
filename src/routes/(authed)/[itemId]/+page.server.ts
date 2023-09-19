import { db } from '$lib/server/db';
import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, params }) => {
	if (!params.itemId) throw redirect(302, '/');

	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signin');

	const note = await db.query.itemsTable.findFirst({
		where: (table, { eq, and }) =>
			and(eq(table.userId, session.user.userId), eq(table.id, params.itemId!)),
		with: {
			file: true
		}
	});

	if (!note) throw redirect(302, '/');

	return {
		note
	};
};
