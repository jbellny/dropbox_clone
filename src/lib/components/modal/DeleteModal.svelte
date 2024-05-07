<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog'
	import { deleteModalStore } from '$lib/stores/modalStore'
	import { enhance } from '$app/forms'
	import { idStore } from '$lib/stores/idStore'
	import { page } from '$app/stores'
	import toast from 'svelte-french-toast'
	export let fileToDelete: string

	let loading = false
	$: {
		if ($page.form?.deleteFileSuccess) {
			toast.success('File deleted successfully')
			deleteModalStore.setFalse()
		}
	}
	$: {
		if ($page.form?.deleteFileError) {
			toast.error($page.form.deleteFileError.message)
		}
	}
</script>

<AlertDialog.Root open={$deleteModalStore} onOpenChange={deleteModalStore.setFalse}>
	<!-- <AlertDialog.Trigger>Open</AlertDialog.Trigger> -->
	<AlertDialog.Content class="bg-red-700">
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description class="text-white">
				This action cannot be undone. The file <span
					class="rounded-md bg-white px-1 pb-1 text-black">{fileToDelete}</span
				> will be permanently deleted from the database.
			</AlertDialog.Description>
		</AlertDialog.Header>
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
			action="/dashboard?/deleteFile"
		>
			<AlertDialog.Footer>
				<input type="text" hidden name="id" value={$idStore} />
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">
					{#if loading}
						Deleting...
					{:else}
						Delete!
					{/if}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
