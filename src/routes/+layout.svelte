<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-french-toast';
	import 'iconify-icon';
</script>

<ModeWatcher />
<Header />
<Toaster />
<slot></slot>
