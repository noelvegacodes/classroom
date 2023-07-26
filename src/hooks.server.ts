import type { Handle } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const handle = (async ({ event, resolve }) => {
	// Add prisma to the locals object
	event.locals.prisma = prisma;

	// Decode the token, null if invalid or missing
	const token = event.cookies.get('token');
	let decodedToken = null;
	if (token) {
		try {
			decodedToken = jwt.verify(token, JWT_SECRET);
		} catch {
			// invalid token
		}
	}

	// Add the user to the locals object
	event.locals.user = decodedToken as User | null;

	// Resolve the request
	return await resolve(event);
}) satisfies Handle;
