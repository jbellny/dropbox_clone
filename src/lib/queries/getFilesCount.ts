import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

async function getFilesCount(uid: string) {
	const q = query(collection(db, 'files'), where('uid', '==', uid))
	const querySnapshot = await getCountFromServer(q)
	return querySnapshot.data().count
}

export default getFilesCount
