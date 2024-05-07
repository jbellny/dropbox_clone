import { adminAuth } from '$lib/server/firebaseAdmin';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const idToken = await request.json();
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	const decodedIdToken = await adminAuth.verifyIdToken(idToken);
	if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
		const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
		const options = { maxAge: expiresIn, secure: true, httpOnly: true, path: '/' };
		cookies.set('__session', sessionCookie, options);
		return json({ status: 'signedIn' });
	} else {
		throw error(401, 'UNAUTHORIZED REQUEST');
	}
};

export const DELETE = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
