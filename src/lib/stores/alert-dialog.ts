import { writable } from 'svelte/store';

export const alertDialogDeleteItemId = writable<string | null>(null);
