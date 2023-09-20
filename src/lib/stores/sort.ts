import { writable } from 'svelte/store';

export const sortOrder = writable<
	| 'name_asc'
	| 'name_desc'
	| 'created_at_asc'
	| 'created_at_desc'
	| 'updated_at_asc'
	| 'updated_at_desc'
>('name_asc');
