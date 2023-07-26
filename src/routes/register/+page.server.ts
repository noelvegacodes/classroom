import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

const schema = z.object({
	email: z.string().email(),
	name: z.string().min(4),
	password: z.string().min(4),
	passwordConfirm: z.string().min(4)
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

		// Check if passwords match
		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwords must match');
		}

		// Check a the user exists under that email
		if (await locals.prisma.user.findUnique({ where: { email: form.data.email } })) {
			return setError(form, 'email', 'Email already registered');
		}

		// Hash the password
		let password_hash: string;
		try {
			password_hash = await argon2.hash(form.data.password);
		} catch {
			return setError(form, 'password', 'Error hashing password, please try again');
		}

		// Create user
		const createdUser = await locals.prisma.user.create({
			data: {
				email: form.data.email,
				name: form.data.name,
				password_hash
			}
		});

		// Delete the password hash from the createdUser so we can prepare it for the JWT
		delete (createdUser as unknown as { password_hash?: string }).password_hash;

		// Create JWT
		const token = jwt.sign(createdUser, JWT_SECRET, { expiresIn: '7d' });

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
