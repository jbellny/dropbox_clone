<script lang="ts">
	import Logo from './Logo.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import ToggleMode from './ToggleMode.svelte';
	import { signOut } from 'firebase/auth';
	import { auth } from '../../firebaseConfig';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	async function logOut() {
		await fetch('/', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	}
</script>

<header class="sticky left-0 top-0 flex items-center justify-between bg-background">
	<!-- logo -->
	<Logo />
	<!-- avatar -->
	<div class="flex items-center gap-3">
		<ToggleMode />
		{#if $page.data.user}
			<Avatar.Root>
				<Avatar.Image
					alt={`${$page.data.user.name} profile pic`}
					src={$page.data.user.profilePic}
				/>
				<!-- <Avatar.Fallback>CN</Avatar.Fallback> -->
			</Avatar.Root>
			<Button variant="ghost" class="flex items-center gap-1" on:click={logOut}>
				<span>Sign Out</span>
				<iconify-icon icon="tabler:logout" height="20" width="20"></iconify-icon>
			</Button>
		{/if}
	</div>
	<!-- logout -->
</header>
