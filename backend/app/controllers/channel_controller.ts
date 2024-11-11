import { HttpContext } from '@adonisjs/core/http'
import Channel from '../models/channel.ts'
import ChannelUser from '#models/channel_user'
import { MembershipRole, MembershipStatus } from '#models/enum'

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

            // Fetch channels where the user is either a member or invited
            const channelUsers = await ChannelUser.query()
                .preload('channel', (channelQuery) => {
                    channelQuery.select('name', 'is_private')
                })
                .preload('user')
                .where('user_id', userId)
                .whereIn('status', ['active', 'invited'])

            // Format response to include channel data and `isInvitation` flag
            const channels = channelUsers.map((cu) => ({
                name: cu.channel.name,
                isPrivate: cu.channel.is_private,
                users: cu.user,
                isInvitation: cu.status === 'invited',
                role: cu.role,
            }))

            return response.ok({ channels })
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

            const { name, isPrivate } = request.all()

            const channel = await Channel.findBy('name', name)

            if (channel) {
                return response.conflict({ message: 'Channel name is already in use' })
            }

            const newChannel = await Channel.create({
                name,
                is_private: isPrivate,
                created_by: userId,
            })

            await ChannelUser.create({
                channelId: newChannel.id,
                userId: userId,
                role: MembershipRole.ADMIN,
                status: MembershipStatus.ACTIVE,
            })

            return response.created({
                channel: {
                    name: newChannel.name,
                    isPrivate,
                    users: [],
                    isInvitation: false,
                    role: MembershipRole.ADMIN,
                },
            })
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
    async delete({ response, auth, request }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName } = request.all()

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
