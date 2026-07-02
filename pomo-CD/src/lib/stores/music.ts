import { writable } from 'svelte/store';

export const currentThumbnail = writable<string | null>(null);