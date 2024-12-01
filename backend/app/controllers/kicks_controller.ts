import type { HttpContext } from '@adonisjs/core/http'
import ChannelUser from '#models/channel_user'
import { MembershipRole, MembershipStatus } from '#models/enum'
import Kick from '#models/kick'
import Channel from '#models/channel'

export default class KicksController {
    async kick({ request, response, auth }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName, username } = request.only(['channelName', 'username'])
            const currentUser = await auth.authenticate()

            const channel = await Channel.findBy('name', channelName)

            if (!channel) {
                return response.badRequest({ message: 'Channel not found' })
            }

            const targetUser = await ChannelUser.query()
                .where('channelId', channel.id)
                .whereHas('user', (query) => query.where('username', username))
                .first()

            if (!targetUser) {
                return response.badRequest({ message: 'User not found in this channel' })
            }

            if (currentUser.id === targetUser.userId) {
                return response.badRequest({ message: 'You cannot kick yourself' })
            }

            // Check if the current user is a member
            const kicker = await ChannelUser.query()
                .where('channelId', channel.id)
                .where('userId', currentUser.id)
                .first()

            if (!kicker) {
                return response.forbidden({ message: 'You are not part of this channel' })
            }

            // Add or count the kick
            const existingKick = await Kick.query()
                .where('channelId', channel.id)
                .where('kickedId', targetUser.userId)
                .where('kickerId', kicker.userId)
                .first()

            if (existingKick) {
                return response.badRequest({ message: 'You already voted to kick this user' })
            }

            await Kick.create({
                channelId: channel.id,
                kickedId: targetUser.userId,
                kickerId: kicker.userId,
            })

            // Count votes
            const kickCount = await Kick.query()
                .where('channelId', channel.id)
                .andWhere('kickedId', targetUser.userId)

            if (kickCount.length >= 1 || kicker.role === MembershipRole.ADMIN) {
                const banUser = await ChannelUser.query()
                    .where('channelId', channel.id)
                    .whereHas('user', (query) => query.where('username', username))
                    .update({ status: MembershipStatus.BANNED, updated_at: new Date() })

                if (banUser) {
                    return response.ok({ message: 'User was banned from the channel' })
                }
            }

            return response.ok({ message: 'Kick registered' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error while kicking member',
                error: error.message,
            })
        }
    }
}
