import { HttpContext } from '@adonisjs/core/http'
import Channel from '../models/channel.ts'
import ChannelUser from '#models/channel_user'
import { MembershipRole, MembershipStatus } from '#models/enum'
import User from '#models/user'

export default class ChannelController {
    async retrieve({ response, auth }: HttpContext) {
        try {
            const userId = auth.user?.id

            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const myChannels = await ChannelUser.query()
                .where('userId', userId)
                .andWhereIn('status', [MembershipStatus.ACTIVE, MembershipStatus.INVITED])
                .preload('channel', (channelQuery) => {
                    channelQuery
                        .select('name', 'is_private')
                        .preload('channelUsers', (channelUserQuery) => {
                            channelUserQuery
                                .where('status', MembershipStatus.ACTIVE) // len aktívni členovia
                                .preload('user', (userQuery) => {
                                    userQuery.select(
                                        'id',
                                        'firstname',
                                        'lastname',
                                        'username',
                                        'status'
                                    )
                                })
                        })
                })

            const channels = myChannels.map((channelUser) => {
                const channel = channelUser.channel
                return {
                    name: channel.name,
                    isPrivate: channel.is_private,
                    users:
                        channelUser.status === 'invited'
                            ? []
                            : channel.channelUsers.map((cu) => cu.user),
                    isInvitation: channelUser.status === 'invited',
                    role: channelUser.role,
                }
            })
            return response.ok({ channels })
        } catch (error) {
            return response.internalServerError({
                message: 'Error retrieving channels',
                error: error.message,
            })
        }
    }

    async create({ request, response, auth }: HttpContext) {
        const userId = auth.user?.id
        if (!userId) {
            return response.unauthorized({ message: 'User not authenticated' })
        }

        const { name, isPrivate, join } = request.all()

        const channel = await Channel.findBy('name', name)

        try {
            if (channel && join) {
                if (channel.is_private) {
                    return response.conflict({
                        message:
                            "Channel already exists, but it's private try to contact admin to send invitation",
                    })
                }

                // Check if the user was banned previously
                const bannedMember = await ChannelUser.query()
                    .where('userId', userId)
                    .andWhere('channel_id', channel.id)
                    .andWhere('status', MembershipStatus.BANNED)

                if (bannedMember.length !== 0) {
                    return response.forbidden({ message: 'You are banned from this channel' })
                }

                await ChannelUser.create({
                    channelId: channel.id,
                    userId: userId,
                    role: MembershipRole.MEMBER,
                    status: MembershipStatus.ACTIVE,
                })

                const memberRecord = await ChannelUser.query()
                    .where('userId', userId)
                    .andWhere('channel_id', channel.id)
                    .andWhere('status', MembershipStatus.ACTIVE)
                    .preload('channel', (channelQuery) => {
                        channelQuery
                            .select('name', 'is_private')
                            .where('name', name)
                            .preload('users', (userQuery) => {
                                userQuery.select('id', 'firstname', 'lastname', 'username')
                            })
                    })
                    .first()

                return response.created({
                    channel: {
                        name: channel.name,
                        isPrivate: channel.is_private,
                        users: memberRecord?.channel.users,
                        isInvitation: false,
                        role: MembershipRole.MEMBER,
                    },
                })
            }

            if (channel) {
                return response.conflict({
                    message: 'Channel already exists, try to use different name',
                })
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
                    isPrivate: newChannel.is_private,
                    users: [
                        {
                            id: userId,
                            firstname: auth.user.firstname,
                            lastname: auth.user.lastname,
                            username: auth.user.username,
                        } as User,
                    ],
                    isInvitation: false,
                    role: MembershipRole.ADMIN,
                },
            })
        } catch (error) {
            return response.internalServerError({
                message: join ? 'Error joining channel' : 'Error creating channel',
                error: error.message,
            })
        }
    }

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

    async quit({ response, auth, request }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName } = request.all()

            const channel = await Channel.query().where('name', channelName).first()

            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            const channelUser = await ChannelUser.query()
                .where('channelId', channel.id)
                .andWhere('user_id', userId)
                .andWhere('status', 'active')
                .first()

            if (!channelUser) {
                return response.notFound({ message: 'User not found in channel' })
            }

            await channel.related('users').detach([userId])

            return response.ok({ message: 'Channel quit successfully' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error quitting channel',
                error: error.message,
            })
        }
    }
}
