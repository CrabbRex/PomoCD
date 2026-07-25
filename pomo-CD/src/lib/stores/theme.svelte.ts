export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'pomocd-theme';

function initialMode(): ThemeMode {
	if (typeof window === 'undefined') return 'light';
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

class ThemeStore {
	mode = $state<ThemeMode>(initialMode());
	dataTheme = $derived(this.mode === 'dark' ? 'dark' : 'discplayer');

	toggle() {
		this.mode = this.mode === 'dark' ? 'light' : 'dark';
	}

	persist() {
		window.localStorage.setItem(STORAGE_KEY, this.mode);
	}
}

export const themeStore = new ThemeStore();
