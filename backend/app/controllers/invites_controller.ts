import type { HttpContext } from '@adonisjs/core/http'
import ChannelUser from '#models/channel_user'
import { MembershipRole, MembershipStatus } from '#models/enum'
import Channel from '#models/channel'
import User from '#models/user'
import Kick from '#models/kick'

export default class InvitesController {
    async invite({ request, response, auth }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName, username } = request.only(['channelName', 'username'])

            // Ensure both channelName and username are provided
            if (!channelName || !username) {
                return response.badRequest({ message: 'Channel name and username are required' })
            }

            // Find the channel by its unique name
            const channel = await Channel.findBy('name', channelName)
            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            // Find the user by username
            const user = await User.findBy('username', username)
            if (!user) {
                return response.notFound({ message: 'User not found' })
            }

            // Check if the user is already invited or a member of the channel
            const membership = await ChannelUser.query()
                .where('user_id', user.id)
                .andWhere('channel_id', channel.id)
                .first()

            if (membership && membership.status === MembershipStatus.BANNED) {
                const inviter = await ChannelUser.query()
                    .where('user_id', userId)
                    .andWhere('channel_id', channel.id)
                    .first()

                if (!inviter) {
                    return response.forbidden({ message: 'You are not part of this channel' })
                } else if (inviter.role !== MembershipRole.ADMIN) {
                    return response.forbidden({ message: 'Only admin can invite banned users' })
                }

                await ChannelUser.query()
                    .where('user_id', user.id)
                    .andWhere('channel_id', channel.id)
                    .update({ status: MembershipStatus.INVITED, updated_at: new Date() })

                await Kick.query()
                    .where('channelId', channel.id)
                    .andWhere('kickedId', user.id)
                    .delete()

                return response.created({ message: 'Invite sent successfully' })
            } else if (membership) {
                return response.conflict({
                    message: 'User is already invited or a member of the channel',
                })
            }

            // Create a new invite record in the ChannelUser pivot table
            await ChannelUser.create({
                userId: user.id,
                channelId: channel.id,
                role: MembershipRole.MEMBER,
                status: MembershipStatus.INVITED,
            })

            return response.created({ message: 'Invite sent successfully' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error inviting user to channel',
                error: error.message,
            })
        }
    }

    async revoke({ request, response }: HttpContext) {
        try {
            const { channelName, username } = request.only(['channelName', 'username'])

            if (!channelName || !username) {
                return response.badRequest({ message: 'Channel name and username are required' })
            }

            const channel = await Channel.findBy('name', channelName)
            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            const user = await User.findBy('username', username)
            if (!user) {
                return response.notFound({ message: 'User not found' })
            }

            const membership = await ChannelUser.query()
                .where('user_id', user.id)
                .andWhere('channel_id', channel.id)
                .first()

            if (!membership) {
                return response.notFound({ message: 'User is not a member of this channel' })
            }

            await channel.related('users').detach([user.id])

            return response.ok({ message: 'User successfully removed from channel' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error removing user from channel',
                error: error.message,
            })
        }
    }

    async accept({ response, auth, request }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName } = request.all()

            if (!channelName) {
                return response.badRequest({ message: 'Channel name is required' })
            }

            // Find the channel by its unique name
            const channel = await Channel.findBy('name', channelName)

            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            // Find the invite record in the ChannelUser pivot table
            const inviteRecord = await ChannelUser.query()
                .where('user_id', userId)
                .andWhere('channel_id', channel.id)
                .andWhere('role', MembershipRole.MEMBER)
                .andWhere('status', MembershipStatus.INVITED) // Check if status is "invited"
                .update({ status: MembershipStatus.ACTIVE, updated_at: new Date() })

            if (!inviteRecord) {
                return response.notFound({ message: 'Invite not found or access denied' })
            }

            const memberRecord = await ChannelUser.query()
                .where('userId', userId)
                .andWhere('channel_id', channel.id)
                .andWhere('status', MembershipStatus.ACTIVE)
                .preload('channel', (channelQuery) => {
                    channelQuery
                        .select('name', 'is_private')
                        .where('name', channelName)
                        .preload('users', (userQuery) => {
                            userQuery.select('id', 'firstname', 'lastname', 'username')
                        })
                })
                .first()

            if (!memberRecord) {
                return response.notFound({ message: 'Invite not found or access denied' })
            }

            return response.ok({
                channel: {
                    name: channel.name,
                    isPrivate: channel.is_private,
                    users: memberRecord.channel.users,
                    isInvitation: MembershipStatus.ACTIVE,
                    role: MembershipRole.MEMBER,
                },
            })
        } catch (error) {
            return response.internalServerError({
                message: 'Error accepting channel invite',
                error: error.message,
            })
        }
    }

    async reject({ auth, request, response }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName } = request.all()

            if (!channelName) {
                return response.badRequest({ message: 'Channel name is required' })
            }

            // Find the channel by its unique name
            const channel = await Channel.findBy('name', channelName)

            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            // Find the invite record in the ChannelUser pivot table
            const inviteRecord = await ChannelUser.query()
                .where('user_id', userId)
                .andWhere('channel_id', channel.id)
                .andWhere('role', MembershipRole.MEMBER)
                .andWhere('status', MembershipStatus.INVITED)
                .first()

            if (!inviteRecord) {
                return response.notFound({ message: 'Invite not found or access denied' })
            }

            // Delete the invite record to signify rejection
            await channel.related('users').detach([userId])

            return response.ok({ message: 'Invite rejected successfully' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error rejecting channel invite',
                error: error.message,
            })
        }
    }
}
