import type { Item } from '$lib/server/db/schema';

type Input = Item & { children?: Item[] };
export type Tree = Input[];

function sortItems(items?: Input[]): Input[] {
	return (
		items?.sort((a, b) => {
			if (a.type === 'folder' && b.type === 'file') return -1;
			else if (a.type === 'file' && b.type === 'folder') return 1;
			return a.name.localeCompare(b.name);
		}) ?? []
	);
}

export function createItemTreeFromList(list: Input[]): Tree {
	const map: Record<string, number> = {};
	const roots: Input[] = [];

	for (let i = 0; i < list.length; i += 1) {
		map[list[i].id] = i; // initialize the map
		list[i].children = []; // initialize the children
	}

	for (let i = 0; i < list.length; i += 1) {
		const node = list[i];
		if (node.parentId !== null) {
			// if you have dangling branches check that map[node.parentId] exists
			list[map[node.parentId]].children?.push(node);
			// TODO: Improve the sorting to not sort every time it goes through the loop
			if (list[map[node.parentId]].children)
				list[map[node.parentId]].children = sortItems(list[map[node.parentId]].children);
		} else {
			roots.push(node);
		}
	}
	return sortItems(roots);
}
