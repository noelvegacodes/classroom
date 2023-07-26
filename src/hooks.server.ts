import type { Handle } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const handle = (async ({ event, resolve }) => {
	event.locals.prisma = prisma;

	const token = event.cookies.get('token');
	let decodedToken = null;
	if (token) {
		try {
			decodedToken = jwt.verify(token, JWT_SECRET);
		} catch {
			// invalid token
		}
	}

	// Set the user in the locals
	event.locals.user = decodedToken as User | null;

	const response = await resolve(event);
	return response;
}) satisfies Handle;
