<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog'
	import Input from '../ui/input/input.svelte'
	import Button from '../ui/button/button.svelte'
	import { renameModalStore } from '$lib/stores/modalStore'
	import { enhance } from '$app/forms'
	import { idStore } from '$lib/stores/idStore'
	import { page } from '$app/stores'
	import toast from 'svelte-french-toast'
	export let fileToRename: string

	let loading = false
	$: {
		if ($page.form?.editFileNameSuccess) {
			toast.success('File name has been updated successfully')
			renameModalStore.setFalse()
		}
	}
	$: {
		if ($page.form?.editFileNameError) {
			toast.error($page.form.editFileNameError.message)
		}
	}
</script>

<Dialog.Root open={$renameModalStore} onOpenChange={renameModalStore.setFalse}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Rename File...</Dialog.Title>
			<Dialog.Description>Rename the file to a new name</Dialog.Description>
		</Dialog.Header>
		<form
			class="space-y-4"
			use:enhance={() => {
				loading = true
				return async ({ update }) => {
					await update()
					loading = false
				}
			}}
			method="POST"
			action="/dashboard?/editFileName"
		>
			<div>
				<p>Name</p>
				<input type="text" hidden name="id" value={$idStore} />
				<Input name="newFileName" placeholder={fileToRename} />
			</div>
			<Dialog.Footer>
				<Button type="submit">
					{#if loading}
						Renaming...
					{:else}
						Save Changes
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
