import { doc, deleteDoc } from 'firebase/firestore'
import { db, storage } from '../../firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'

async function deleteFile(id: string) {
	if (id === '') throw new Error('No file selected')

	const docRef = doc(db, 'files', id)
	const fileRef = ref(storage, `files/${docRef.id}`)

	await deleteDoc(docRef)
	await deleteObject(fileRef)
}

export default deleteFile
