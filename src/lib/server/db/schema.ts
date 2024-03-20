import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import { blob, index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('auth_user', {
	id: text('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	email: text('email', { length: 128 }).unique()
	// other user attributes
});

export const key = sqliteTable('user_key', {
	id: text('id', {
		length: 255
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	}).notNull(),
	hashedPassword: text('hashed_password', {
		length: 255
	})
});

export const session = sqliteTable('user_session', {
	id: text('id', {
		length: 128
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	}).notNull(),
	activeExpires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idleExpires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull(),
	email: text('email', { length: 128 })
});

export const itemsTable = sqliteTable(
	'item',
	{
		id: text('id', {
			length: 48
		}).primaryKey(),
		userId: text('user_id', {
			length: 15
		}).notNull(),
		name: text('name', {
			length: 75
		}).notNull(),
		type: text('type', { enum: ['folder', 'file'] }).notNull(),
		parentId: text('parent_id', {
			length: 48
		}),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`),
		updatedAt: integer('updated_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => ({
		userIdx: index('item_user_idx').on(table.userId),
		parentIdx: index('item_parent_idx').on(table.parentId)
	})
);
export type Item = InferSelectModel<typeof itemsTable>;

export const itemsRelations = relations(itemsTable, ({ one }) => ({
	file: one(filesTable, {
		fields: [itemsTable.id],
		references: [filesTable.itemId]
	})
}));

export const filesTable = sqliteTable(
	'file',
	{
		id: text('id', {
			length: 48
		}).primaryKey(),
		itemId: text('item_id', {
			length: 48
		}).notNull(),
		content: text('content').notNull()
	},
	(table) => ({
		itemIdx: index('file_item_idx').on(table.itemId)
	})
);

export const filesRelations = relations(filesTable, ({ one }) => ({
	item: one(itemsTable, {
		fields: [filesTable.itemId],
		references: [itemsTable.id]
	})
}));
