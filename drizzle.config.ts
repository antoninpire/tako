import { type Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
	},
	tablesFilter: ['tako_*']
} satisfies Config;
