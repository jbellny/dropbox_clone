import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

async function editFileName(id: string, newFileName: string) {
	if (id === '') throw new Error('No file selected')
	if (newFileName === '') throw new Error('File name cannot be empty')

	const docRef = doc(db, 'files', id)
	await updateDoc(docRef, {
		fileName: newFileName
	})
}

export default editFileName
