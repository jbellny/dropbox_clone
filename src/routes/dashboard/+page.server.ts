import editFileName from '$lib/mutations/editFileName.server.js'
import deleteFile from '$lib/mutations/deleteFile.server.js'
import getFilesCount from '$lib/queries/getFilesCount'
import getUser from '$lib/queries/getUser.js'
import getUserFiles from '$lib/queries/getUserFiles.js'
import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	const { userId } = locals
	if (!userId) {
		throw redirect(307, '/')
	}

	return {
		user: await getUser(userId),
		files: await getUserFiles(userId),
		count: await getFilesCount(userId)
	}
}

export const actions = {
	editFileName: async ({ request }) => {
		const data = await request.formData()
		const newFileName = data.get('newFileName') as string
		const id = data.get('id') as string
		// console.log('newFileName', newFileName)
		// console.log('id', id)
		try {
			await editFileName(id, newFileName)
			return { editFileNameSuccess: true }
		} catch (error) {
			const errorMessage = (error as Error).message
			return fail(422, {
				editFileNameError: errorMessage
			})
		}
	},
	deleteFile: async ({ request }) => {
		const data = await request.formData()
		const id = data.get('id') as string
		// console.log('id', id)
		// console.log('newFileName', newFileName)
		try {
			await deleteFile(id)
			return { deleteFileSuccess: true }
		} catch (error) {
			const errorMessage = (error as Error).message
			return fail(422, {
				deleteFileError: errorMessage
			})
		}
	}
}
