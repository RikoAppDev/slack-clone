import { HttpContext } from '@adonisjs/core/http'
import Channel from '../models/channel.ts'
import ChannelUser from '#models/channel_user'
import { MembershipRole, MembershipStatus } from '#models/enum'

export default class ChannelController {
    async retrieve({ response, auth }: HttpContext) {
        try {
            const userId = auth.user?.id

            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const myChannels = await ChannelUser.query()
                .preload('channel', (channelQuery) => {
                    channelQuery.select('name', 'is_private').preload('users', (userQuery) => {
                        userQuery.select('id', 'firstname', 'lastname', 'username')
                    })
                })
                .where('userId', userId)
                .whereIn('status', ['active', 'invited'])

            const channels = myChannels.map((cu) => ({
                name: cu.channel.name,
                isPrivate: cu.channel.is_private,
                users: cu.status === 'invited' ? [] : cu.channel.users,
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

    async create({ request, response, auth }: HttpContext) {
        const userId = auth.user?.id
        if (!userId) {
            return response.unauthorized({ message: 'User not authenticated' })
        }

        const { name, isPrivate, join } = request.all()

        const channel = await Channel.findBy('name', name)

        try {
            if (channel && join) {
                await ChannelUser.create({
                    channelId: channel.id,
                    userId: userId,
                    role: MembershipRole.MEMBER,
                    status: MembershipStatus.ACTIVE,
                })
                return response.created({
                    channel: {
                        name: channel.name,
                        isPrivate,
                        users: [],
                        isInvitation: false,
                        role: MembershipRole.MEMBER,
                    },
                })
            }

            if (channel) {
                if (channel.is_private) {
                    return response.conflict({
                        message:
                            "Channel already exists, but it's private try to contact admin to send invitation",
                    })
                } else {
                    return response.conflict({
                        message: 'Channel already exists, try to use different name',
                    })
                }
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

            console.log(channelName, userId)

            const channel = await Channel.query()
                .where('name', channelName)
                .andWhere('created_by', userId)
                .first()

            console.log(channel)

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
