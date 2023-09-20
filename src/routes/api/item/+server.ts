import { db } from '$lib/server/db/index.js';
import { itemsTable } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const editItemSchema = z.object({
	name: z.string().min(1),
	itemId: z.string().min(1)
});

export async function PUT({ locals, request }) {
	const session = await locals.auth.validate();
	if (!session) throw error(401, 'Unauthorized');

	const userId = session.user.userId;

	const body = await request.json();

	const parsedBody = editItemSchema.safeParse(body);

	if (!parsedBody.success) {
		throw error(400, parsedBody.error.message);
	}

	const item = await db.query.itemsTable.findFirst({
		where: (table, { eq, and }) =>
			and(eq(table.id, parsedBody.data.itemId), eq(table.userId, userId))
	});

	if (!item) throw error(404, 'Item not found');

	await db
		.update(itemsTable)
		.set({
			name: parsedBody.data.name
		})
		.where(eq(itemsTable.id, parsedBody.data.itemId));

	return new Response();
}
