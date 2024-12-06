import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { UserStatus } from '#models/enum'

export default class StatusesController {
    async get({ auth, response }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const user = await User.findOrFail(userId)
            return response.ok({ status: user.status })
        } catch {
            return response.notFound({ message: 'User not found' })
        }
    }

    async update({ auth, request, response }: HttpContext) {
        try {
            const user = auth.user!
            const status = request.input('status') as UserStatus

            if (!Object.values(UserStatus).includes(status)) {
                return response.badRequest({ message: 'Invalid status value' })
            }

            user.status = status
            await user.save()

            return response.ok({ message: 'Status updated successfully', status })
        } catch (error) {
            return response.badRequest({ message: 'Failed to update status' })
        }
    }
}
