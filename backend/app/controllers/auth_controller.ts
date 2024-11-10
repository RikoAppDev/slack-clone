import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginAuthValidator, registerAuthValidator } from '#validators/auth'

export default class AuthController {
    // Register a new user
    async register({ request, response }: HttpContext) {
        const data = await request.validateUsing(registerAuthValidator)

        const user = await User.findBy('email', data.email)

        if (user) {
            return response.conflict({ message: 'Email already in use' })
        }

        try {
            const newUser = await User.create(data)

            const token = await User.accessTokens.create(newUser)

            return response.created({
                user: {
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    username: newUser.username,
                },
                token: token.value!.release(),
            })
        } catch (error) {
            return response.badRequest({ message: 'Registration failed', error: error.message })
        }
    }

    // Log in an existing user
    async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginAuthValidator)

        try {
            // Verify user credentials
            const user = await User.verifyCredentials(email, password)

            const token = await User.accessTokens.create(user)

            return response.ok({
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                },
                token: token.value!.release(),
            })
        } catch (error) {
            return response.unauthorized({ message: 'Invalid credentials', error: error.message })
        }
    }

    // Log out the authenticated user
    async logout({ auth, response }: HttpContext) {
        const user = auth.user!

        await User.accessTokens.delete(user, user.currentAccessToken.identifier)

        return response.ok({ message: 'Logout successful' })
    }

    // Get user data
    async me({ auth }: HttpContext) {
        await auth.check()

        return {
            user: auth.user,
        }
    }
}