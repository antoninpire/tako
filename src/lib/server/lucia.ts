import { dev } from '$app/environment';
import { tursoClient } from '$lib/server/db';
import { libsql } from '@lucia-auth/adapter-sqlite';

import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: libsql(tursoClient, {
		key: 'user_key',
		session: 'user_session',
		user: 'auth_user'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			email: data.email
		};
	}
});

export type Auth = typeof auth;
