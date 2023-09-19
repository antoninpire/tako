import { db } from '$lib/server/db';
import { itemsTable } from '$lib/server/db/schema.js';
import { createId } from '@paralleldrive/cuid2';
import { error } from '@sveltejs/kit';

export async function POST({ locals }) {
	const session = await locals.auth.validate();
	if (!session) throw error(401, 'Unauthorized');

	const userId = session.user.userId;

	const folder1Id = createId();

	await db.insert(itemsTable).values({
		id: folder1Id,
		userId,
		name: 'Folder 1',
		parentId: null,
		type: 'folder'
	});

	const folder2Id = createId();

	await db.insert(itemsTable).values({
		id: folder2Id,
		userId,
		name: 'Folder 1 1',
		parentId: folder1Id,
		type: 'folder'
	});

	const folder3Id = createId();
	await db.insert(itemsTable).values({
		id: folder3Id,
		userId,
		name: 'Folder 1 1 1',
		parentId: folder2Id,
		type: 'folder'
	});

	await Promise.all([
		db.insert(itemsTable).values({
			id: createId(),
			userId,
			name: 'File 1 1',
			parentId: folder1Id,
			type: 'file'
		}),
		db.insert(itemsTable).values({
			id: createId(),
			userId,
			name: 'File 1 1 1',
			parentId: folder2Id,
			type: 'file'
		}),
		db.insert(itemsTable).values({
			id: createId(),
			userId,
			name: 'File 1 1 2',
			parentId: folder2Id,
			type: 'file'
		}),
		db.insert(itemsTable).values({
			id: createId(),
			userId,
			name: 'File 1 1 1 1',
			parentId: folder3Id,
			type: 'file'
		}),
		db.insert(itemsTable).values({
			id: createId(),
			userId,
			name: 'File 1',
			parentId: null,
			type: 'file'
		}),
		db.insert(itemsTable).values({
			id: createId(),
			userId,
			name: 'File 2',
			parentId: null,
			type: 'file'
		})
	]);

	return new Response();
}
