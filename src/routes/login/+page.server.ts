import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(4)
});

export const load = async () => {
	const form = await superValidate(schema);
	return { form };
};

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, schema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const user = await locals.prisma.user.findUnique({ where: { email: form.data.email } });

		// Check if user exists
		if (!user) {
			return setError(form, 'email', 'Email not found');
		}

		// Check if password matches
		if (!(await argon2.verify(user.password_hash, form.data.password))) {
			return setError(form, 'password', 'Incorrect password');
		}

		// Delete the password hash from the user so we can prepare it for the JWT
		delete (user as unknown as { password_hash?: string }).password_hash;

		// Create JWT
		const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

		// Set the JWT as a cookie
		cookies.set('token', token, {
			path: '/',
			// secure: true, // HTTPS only
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		throw redirect(303, '/');
	}
};
