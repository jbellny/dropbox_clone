import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { error } from '@sveltejs/kit';
import type { TUser } from '$lib/types';

const getUser = async (uid: string): Promise<TUser> => {
	const userRef = doc(db, 'users', uid);
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data() as TUser;
	} else {
		throw error(404, 'User not found');
	}
};

export default getUser;
