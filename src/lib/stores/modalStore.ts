import { writable } from 'svelte/store'

export const modalStore = (modalState: boolean) => {
	const { subscribe, set, update } = writable(modalState)

	function setTrue() {
		set(true)
	}

	function setFalse() {
		set(false)
	}

	function toggleModal() {
		update((modalState) => (modalState = !modalState))
	}
	return {
		toggleModal,
		setTrue,
		setFalse,
		subscribe
	}
}

export const renameModalStore = modalStore(false)
export const deleteModalStore = modalStore(false)
