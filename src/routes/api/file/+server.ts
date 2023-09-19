import { db } from '$lib/server/db';
import { filesTable, itemsTable } from '$lib/server/db/schema.js';
import { createId } from '@paralleldrive/cuid2';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const schema = z.object({
	itemId: z.string().min(1),
	content: z.string()
});

export async function POST({ locals, request }) {
	const session = await locals.auth.validate();
	if (!session) throw error(401, 'Unauthorized');

	const userId = session.user.userId;

	const body = await request.json();

	const parsedBody = schema.safeParse(body);

	if (!parsedBody.success) {
		throw error(400, parsedBody.error.message);
	}

	const item = await db.query.itemsTable.findFirst({
		where: (table, { eq }) => eq(table.id, parsedBody.data.itemId),
		with: {
			file: true
		}
	});

	if (!item) throw error(404, 'Item not found');

	if (item && item.userId !== userId) throw error(401, 'Unauthorized');

	if (!item.file) {
		await Promise.all([
			db.insert(filesTable).values({
				id: createId(),
				content: parsedBody.data.content,
				itemId: parsedBody.data.itemId
			}),
			db
				.update(itemsTable)
				.set({
					updatedAt: new Date()
				})
				.where(eq(itemsTable.id, parsedBody.data.itemId))
		]);
	} else {
		await Promise.all([
			db
				.update(filesTable)
				.set({
					content: parsedBody.data.content
				})
				.where(eq(filesTable.id, item.file.id)),
			db
				.update(itemsTable)
				.set({
					updatedAt: new Date()
				})
				.where(eq(itemsTable.id, parsedBody.data.itemId))
		]);
	}

	return new Response();
}
