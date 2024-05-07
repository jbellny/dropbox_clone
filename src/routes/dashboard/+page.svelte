<script lang="ts">
	import DataGrid from '$lib/components/DataGrid.svelte'
	import DropZone from '$lib/components/DropZone.svelte'
	export let data
	console.log('uploaded files', data.files)
</script>

<div class="mx-auto max-w-4xl p-4">
	<!-- drop zone -->
	<DropZone />
	<!-- table (data grid) -->
	<DataGrid count={data.count} files={data.files} />
</div>
