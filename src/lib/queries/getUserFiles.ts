import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import type { TFile } from '$lib/types';

async function getUserFiles(uid: string) {
	const q = query(collection(db, 'files'), where('uid', '==', uid));
	const querySnapshot = await getDocs(q);
	const results: TFile[] = [];
	// console.log(querySnapshot.docs);
	querySnapshot.forEach((doc) => {
		results.push({
			fileName: doc.data().fileName,
			size: doc.data().size,
			type: doc.data().type,
			uid: doc.data().uid,
			downloadUrl: doc.data().downloadURL,
			timestamp: doc.data().timestamp.toDate(),
			id: doc.id
		});
	});
	return results;
}

export default getUserFiles;
