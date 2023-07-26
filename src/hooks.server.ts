import type { Handle } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handle = (async ({ event, resolve }) => {
	event.locals.prisma = prisma;
	const response = await resolve(event);
	return response;
}) satisfies Handle;
