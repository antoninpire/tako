import { createItemTreeFromList } from '$lib/create-item-tree-from-list';
import { db } from '$lib/server/db';
import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signin');

	const items = await db.query.itemsTable.findMany({
		where: (table, { eq }) => eq(table.userId, session.user.userId)
	});

	return {
		session,
		items: createItemTreeFromList(items)
	};
};
