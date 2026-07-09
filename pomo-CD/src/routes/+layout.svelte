<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import MusicSidebar from '$lib/components/music/MusicSidebar.svelte';
	import SettingsPanel from '$lib/components/SettingsPanel.svelte';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<div class="drawer drawer-end" data-theme="luxury">
	<input id="my-drawer-1" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<label for="my-drawer-1" class="btn drawer-button btn-neutral top-4 right-4 fixed">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="size-6"
			>
				<path
					fill-rule="evenodd"
					d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-1" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 min-h-full w-80 p-4">
			<!-- Sidebar content here -->
			<MusicSidebar />
		</ul>
	</div>
</div>

<!-- Settings drawer (opens from the left) -->
<div class="drawer drawer-end" data-theme="luxury">
	<input id="settings-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<label for="settings-drawer" class="btn drawer-button btn-neutral top-4 right-24 fixed" aria-label="Open settings">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
				<path
					fill-rule="evenodd"
					d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.13-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.362c.115-.047.283-.032.45.083.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.13.45-.082l1.02.362a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.019.362c-.115.047-.283.032-.45-.083a7.49 7.49 0 0 0-.985-.57c-.183-.088-.277-.228-.297-.349l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
	</div>
	<div class="drawer-side">
		<label for="settings-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-200 min-h-full w-80 p-4">
			<h2 class="text-xl font-bold mb-4">Settings</h2>
			<SettingsPanel />
		</div>
	</div>
</div>
