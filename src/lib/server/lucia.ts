import { dev } from '$app/environment';
import { connection } from '$lib/server/db';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: planetscale(connection, {
		key: 'tako_user_key',
		session: 'tako_user_session',
		user: 'tako_auth_user'
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
