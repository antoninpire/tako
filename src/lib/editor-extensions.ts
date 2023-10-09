import { Blockquote } from '$lib/extensions/blockquote';
import { Bold } from '$lib/extensions/bold';
import { BulletList } from '$lib/extensions/bullet-list';
import { CharacterCount } from '$lib/extensions/character-count';
import { Code } from '$lib/extensions/code';
import { Document } from '$lib/extensions/document';
import { Dropcursor } from '$lib/extensions/drop-cursor';
import { Gapcursor } from '$lib/extensions/gap-cursor';
import { HardBreak } from '$lib/extensions/hard-break';
import { Heading } from '$lib/extensions/heading';
import { History } from '$lib/extensions/history';
import { HorizontalRule } from '$lib/extensions/horizontal-rule';
import { Italic } from '$lib/extensions/italic';
import { ListItem } from '$lib/extensions/list-item';
import { OrderedList } from '$lib/extensions/ordered-list';
import { Paragraph } from '$lib/extensions/paragraph';
import { Placeholder } from '$lib/extensions/placeholder';
import { Strike } from '$lib/extensions/strike';
import { TaskItem } from '$lib/extensions/task-item';
import { TaskList } from '$lib/extensions/task-list';
import { Text } from '$lib/extensions/text';
import { TextStyle } from '$lib/extensions/text-style';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Link } from '@tiptap/extension-link';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';

const lowlight = createLowlight({
	html,
	css,
	js,
	ts
});

export const extensions = [
	Blockquote,
	BulletList,
	Code,
	Document,
	Dropcursor,
	Gapcursor,
	HardBreak,
	Heading,
	Link,
	History,
	HorizontalRule,
	Italic,
	ListItem,
	OrderedList,
	Paragraph,
	Strike,
	TextStyle,
	Text,
	TaskList,
	TaskItem.configure({
		nested: true
	}),
	Bold,
	CharacterCount,
	Placeholder.configure({
		placeholder: 'Write something …'
	}),
	CodeBlockLowlight.configure({ lowlight })
];
