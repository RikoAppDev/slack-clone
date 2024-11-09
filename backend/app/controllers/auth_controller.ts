import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    // Register a new user
    async register({ request, response }: HttpContext) {
        const { firstname, lastname, username, email, password } = request.only([
            'firstname',
            'lastname',
            'username',
            'email',
            'password',
        ])

        const user = await User.findBy('email', email)

        if (user) {
            return response.conflict({ message: 'Email already in use' })
        }

        try {
            const newUser = await User.create({ firstname, lastname, username, email, password })

            return response.created({
                user: {
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    username: newUser.username,
                },
                token: 'token',
            })
        } catch (error) {
            return response.badRequest({ message: 'Registration failed', error: error.message })
        }
    }

    // Log in an existing user
    async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        try {
            // Verify user credentials
            const user = await User.query().where('email', email).firstOrFail()
            if (!(await hash.verify(user.password, password))) {
                return response.unauthorized({ message: 'Invalid credentials' })
            }

            // TODO: token
            // const token = await auth.use('api').generate(user)
            return response.ok({
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                },
                token: 'token',
            })
        } catch (error) {
            return response.unauthorized({ message: 'Login failed', error: error.message })
        }
    }

    // Log out the authenticated user
    public async logout({ auth, response }: HttpContext) {
        await auth.use('api').revoke()
        return response.ok({ message: 'Logout successful' })
    }
}
