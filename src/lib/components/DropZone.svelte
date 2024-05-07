<script lang="ts">
	import type { Files } from 'lucide-svelte';
	import type { EventHandler } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
	import { db, storage } from '../../firebaseConfig';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import toast from 'svelte-french-toast';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	const uid = $page.data.user.uid;
	let isDragging = false;
	let fileInput: HTMLInputElement;
	let maxSize = 1024 * 1024 * 10;

	function handleClick() {
		fileInput.click();
	}

	function handleDragEnter() {
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		console.log('drop handled...');
		isDragging = false;
		if (event.dataTransfer?.files) {
			const droppedFiles = Array.from(event.dataTransfer.files);
			checkFileSizeAndUpload(droppedFiles);
		}
	}

	function handleFileSelect(event: Event) {
		if (fileInput.files) {
			const selectedFiles = Array.from(fileInput.files);
			checkFileSizeAndUpload(selectedFiles);
		}
	}

	async function checkFileSizeAndUpload(files: File[]) {
		const allFilesValid = files.every((file) => {
			if (file.size > maxSize) {
				alert(`Error ${file.name} is too large (10MB max)`);
				return false;
			}
			return true;
		});
		if (allFilesValid) {
			await toast.promise(Promise.all(files.map(handleUploads)), {
				loading: 'Uploading files...',
				success: 'Files uploaded successfully',
				error: 'Error uploading files'
			});
			await invalidateAll();
		}
	}

	async function handleUploads(file: File) {
		const docRef = await addDoc(collection(db, 'files'), {
			uid,
			fileName: file.name,
			size: file.size,
			type: file.type,
			timestamp: serverTimestamp()
		});

		const fileRef = ref(storage, `files/${docRef.id}`);

		await uploadBytes(fileRef, file);

		const downloadURL = await getDownloadURL(fileRef);

		await updateDoc(docRef, {
			downloadURL
		});
	}
</script>

<button
	class={cn('h-44 w-full rounded-lg border-4 border-dashed bg-border/50', {
		'border-primary bg-primary/50': isDragging
	})}
	on:click={handleClick}
	on:dragenter|preventDefault={handleDragEnter}
	on:dragleave|preventDefault={handleDragLeave}
	on:drop|preventDefault={handleDrop}
	on:dragover|preventDefault
>
	{#if isDragging}
		drop file(s) here
	{:else}
		drag and drop a file here or click to add files
	{/if}
	<input on:change={handleFileSelect} type="file" bind:this={fileInput} hidden multiple />
</button>
