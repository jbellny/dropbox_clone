<script lang="ts">
	import * as Table from '$lib/components/ui/table'
	import type { TFile } from '$lib/types'
	import prettyBytes from 'pretty-bytes'
	import Button from './ui/button/button.svelte'
	import { renameModalStore, deleteModalStore } from '$lib/stores/modalStore'
	import RenameModal from './modal/RenameModal.svelte'
	import { idStore } from '$lib/stores/idStore'
	import DeleteModal from './modal/DeleteModal.svelte'
	export let files: TFile[]
	export let count: number
	let fileToRename = ''
	let fileToDelete = ''

	function getFileType(mime: string) {
		const type = mime.split('/')[1]
		return type
	}
</script>

<div class="my-10 rounded-md border shadow-md">
	{#if files.length === 0}
		<div class="items center flex justify-center p-10">
			<p class="text-sm text-gray-400">No files uploaded yet</p>
		</div>
	{:else}
		<h1 class="py-5 pl-5 font-medium capitalize">files ({count})</h1>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Type</Table.Head>
					<Table.Head>File Name</Table.Head>
					<Table.Head>File Size</Table.Head>
					<Table.Head>Date Added</Table.Head>
					<Table.Head>Link</Table.Head>
					<Table.Head class="sr-only">Delete</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each files as { downloadUrl, fileName, size, type, id, timestamp }}
					<Table.Row>
						<Table.Cell>{getFileType(type)}</Table.Cell>
						<Table.Cell>
							<Button
								variant="link"
								on:click={() => {
									fileToRename = fileName
									idStore.set(id)
									renameModalStore.setTrue()
								}}
							>
								{fileName}
							</Button>
						</Table.Cell>
						<Table.Cell>{prettyBytes(size)}</Table.Cell>
						<Table.Cell>{timestamp.toDateString()}</Table.Cell>
						<Table.Cell>
							<Button download target="_blank" variant="link" href={downloadUrl}>Download</Button>
						</Table.Cell>
						<Table.Cell>
							<Button
								size="icon"
								variant="outline"
								on:click={() => {
									fileToDelete = fileName
									idStore.set(id)
									deleteModalStore.setTrue()
								}}
							>
								<iconify-icon icon="mdi:trash-can-outline" height="16" width="16"></iconify-icon>
							</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
</div>

<RenameModal {fileToRename} />
<DeleteModal {fileToDelete} />
