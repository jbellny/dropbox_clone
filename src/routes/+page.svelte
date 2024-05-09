<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte'
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
	import { auth, db } from '../firebaseConfig'
	import toast from 'svelte-french-toast'
	import { doc, setDoc } from 'firebase/firestore'
	import { goto } from '$app/navigation'
	const provider = new GoogleAuthProvider()

	async function signInWithGoogle() {
		try {
			const { user } = await signInWithPopup(auth, provider)
			const idToken = await user.getIdToken()
			const response = await fetch('/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(idToken)
			})

			if (!response.ok) {
				const errorResponse = await response.json()
				toast.error(errorResponse.message)
			}

			await setDoc(doc(db, 'users', user.uid), {
				email: user.email,
				name: user.displayName,
				profilePic: user.photoURL,
				uid: user.uid
			})

			toast.success('Welcome to DropBox Spaces, redirecting...')

			goto('/dashboard')
		} catch (error) {
			const errorMessage = (error as Error).message
			toast.error(errorMessage)
		}
	}
</script>

<div class="bg-[#1e1919]">
	<div class="mx-auto flex max-w-[777px] flex-col items-center pt-[72px] text-white">
		<h1 class="text-4xl md:text-6xl">securely collaborate on your projects from anywhere</h1>
		<p class="mt-5 text-base md:text-lg">
			DropBox Spaces bring your files and cloud content together, so that your PowerPoints can live
			next to your Google Docs, Trello board, and whatever tools your team wants to use.
		</p>
		<Button
			on:click={signInWithGoogle}
			class="my-4 flex w-fit font-semibold capitalize text-white dark:text-black"
		>
			<span>Get Started Now</span>
			<iconify-icon icon="pepicons-pop:arrow-right" heigh="20" width="20"></iconify-icon>
		</Button>
	</div>
	<!-- add back autoplay and loop -->
	<video src="/dbx1-hero-1920x1080.mp4" class="mt-10" playsinline muted autoplay loop>
		<track kind="captions" />
	</video>
</div>
