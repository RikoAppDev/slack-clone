import { HttpContext } from '@adonisjs/core/http'
import Channel from '../models/channel.ts'
import ChannelUser from '#models/channel_user'

export default class ChannelController {
    /**
     * Retrieve channels for the authenticated user.
     */
    async retrieve({ response, auth }: HttpContext) {
        try {
            const userId = auth.user?.id

            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            // Fetch channels where the user is either a member or an admin and the status is active
            const channelUsers = await ChannelUser.query()
                .preload('channel')
                .where('user_id', userId)
            // .whereIn('role', ['member', 'admin'])
            // .where('status', 'active') // Filter by active status

            return response.ok({
                channels: channelUsers.map((cu) => cu.channel), // Map to actual channel data
            })
        } catch (error) {
            return response.internalServerError({
                message: 'Error retrieving channels',
                error: error.message,
            })
        }
    }

    /**
     * Create a new channel for the authenticated user.
     */
    async create({ request, response, auth }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { name, private: isPrivate } = request.only(['name', 'private'])

            await Channel.create({
                name,
                is_private: isPrivate,
                created_by: userId,
            })

            return response.created({ message: 'Channel created successfully' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error creating channel',
                error: error.message,
            })
        }
    }

    /**
     * Delete a channel by its name, if it belongs to the authenticated user.
     */
    async delete({ response, auth, params }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const channelName = params.name
            console.log(channelName)

            const channel = await Channel.query()
                .where('name', channelName)
                .andWhere('created_by', userId)
                .first()

            if (!channel) {
                return response.notFound({ message: 'Channel not found or access denied' })
            }

            await channel.delete()

            return response.ok({ message: 'Channel deleted successfully' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error deleting channel',
                error: error.message,
            })
        }
    }
}
