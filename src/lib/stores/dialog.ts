import { writable } from 'svelte/store';

export const dialogRenameItem = writable<{ name: string; id: string } | null>(null);
