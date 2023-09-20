import { db } from '$lib/server/db';
import { filesTable, itemsTable, type Item } from '$lib/server/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { error, type Actions } from '@sveltejs/kit';
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

const createItemSchema = z.object({
	type: z.enum(['file', 'folder']),
	parentId: z.string().optional()
});

const deleteItemSchema = z.object({
	itemId: z.string().min(1)
});

export const actions: Actions = {
	'create-item': async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401, 'Unauthorized');

		const userId = session.user.userId;

		const body = Object.fromEntries(await request.formData());

		const parsedBody = createItemSchema.safeParse(body);

		if (!parsedBody.success) {
			throw error(400, parsedBody.error.message);
		}

		const itemId = createId();
		await db.insert(itemsTable).values({
			id: itemId,
			type: parsedBody.data.type,
			userId,
			parentId: parsedBody.data.parentId,
			name: parsedBody.data.type === 'folder' ? 'Untitled Folder' : 'Untitled Note'
		});

		return {
			itemId
		};
	},
	'delete-item': async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401, 'Unauthorized');

		const userId = session.user.userId;

		const body = Object.fromEntries(await request.formData());

		const parsedBody = deleteItemSchema.safeParse(body);

		if (!parsedBody.success) {
			throw error(400, parsedBody.error.message);
		}

		const items = await db.query.itemsTable.findMany({
			where: (table, { eq }) => eq(table.userId, userId)
		});

		const item = items.find((item) => item.id === parsedBody.data.itemId);

		if (!item) throw error(400, 'Item does not exist');

		if (item.type === 'file')
			await Promise.all([
				db
					.delete(itemsTable)
					.where(and(eq(itemsTable.id, parsedBody.data.itemId), eq(itemsTable.userId, userId))),
				db.delete(filesTable).where(eq(filesTable.itemId, parsedBody.data.itemId))
			]);
		else {
			const childrenIds = getChildrenIdsFromRootId(items, parsedBody.data.itemId);
			await Promise.all([
				db
					.delete(itemsTable)
					.where(and(inArray(itemsTable.id, childrenIds), eq(itemsTable.userId, userId))),
				db.delete(filesTable).where(inArray(filesTable.itemId, childrenIds))
			]);
		}
	}
};

// TODO: improve performance with a recursive function
function getChildrenIdsFromRootId(items: Item[], rootId: string) {
	const childrenIds: string[] = [rootId];
	let added = 1;
	while (added > 0) {
		added = 0;
		for (const item of items) {
			if (item.parentId && childrenIds.includes(item.parentId) && !childrenIds.includes(item.id)) {
				childrenIds.push(item.id);
				added++;
			}
		}
	}
	return childrenIds;
}
