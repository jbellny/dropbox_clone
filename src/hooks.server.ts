import { adminAuth } from '$lib/server/firebaseAdmin';

export const handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const sessionCookie = cookies.get('__session');

	try {
		const { uid } = await adminAuth.verifySessionCookie(sessionCookie!, true);
		locals.userId = uid;
	} catch (error) {
		locals.userId = null;
		return resolve(event);
	}
	return resolve(event);
};
