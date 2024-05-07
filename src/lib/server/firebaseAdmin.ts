import { getAuth } from 'firebase-admin/auth';
import pkg from 'firebase-admin';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY
		})
	});
} catch (e) {
	const error = e as Error;
	if (!/already exists/.test(error.message)) {
		console.error('Firebase admin initialization error', error.stack);
	}
}

export const adminAuth = getAuth();
