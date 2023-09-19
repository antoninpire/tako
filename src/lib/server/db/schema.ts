import { relations, type InferSelectModel } from 'drizzle-orm';
import {
	bigint,
	mysqlEnum,
	mysqlTableCreator,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/mysql-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `tako_${name}`);

export const user = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	email: varchar('email', { length: 128 }).unique()
	// other user attributes
});

export const key = mysqlTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});

export const session = mysqlTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull(),
	email: varchar('email', { length: 128 })
});

export const itemsTable = mysqlTable('item', {
	id: varchar('id', {
		length: 48
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	name: varchar('name', {
		length: 75
	}).notNull(),
	type: mysqlEnum('type', ['folder', 'file']).notNull(),
	parentId: varchar('parent_id', {
		length: 48
	}),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
export type Item = InferSelectModel<typeof itemsTable>;

export const itemsRelations = relations(itemsTable, ({ one }) => ({
	file: one(filesTable, {
		fields: [itemsTable.id],
		references: [filesTable.itemId]
	})
}));

export const filesTable = mysqlTable('file', {
	id: varchar('id', {
		length: 48
	}).primaryKey(),
	itemId: varchar('item_id', {
		length: 48
	}).notNull(),
	content: text('content').notNull()
});

export const filesRelations = relations(filesTable, ({ one }) => ({
	item: one(itemsTable, {
		fields: [filesTable.itemId],
		references: [itemsTable.id]
	})
}));
