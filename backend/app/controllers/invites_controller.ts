import type { HttpContext } from '@adonisjs/core/http'
import ChannelUser from '#models/channel_user'
import { MembershipRole, MembershipStatus } from '#models/enum'
import Channel from '#models/channel'
import User from '#models/user'

export default class InvitesController {
    async invite({ request, response }: HttpContext) {
        try {
            const { channelName, username } = request.only(['channelName', 'username'])

            // Ensure both channelName and username are provided
            if (!channelName || !username) {
                return response.badRequest({ message: 'Channel name and username are required' })
            }

            // Find the channel by its unique name
            const channel = await Channel.query().where('name', channelName).first()
            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            // Find the user by username
            const user = await User.query().where('username', username).first()
            if (!user) {
                return response.notFound({ message: 'User not found' })
            }

            // Check if the user is already invited or a member of the channel
            const existingInvite = await ChannelUser.query()
                .where('user_id', user.id)
                .andWhere('channel_id', channel.id)
                .first()

            if (existingInvite) {
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
            const channel = await Channel.query().where('name', channelName).first()
            if (!channel) {
                return response.notFound({ message: 'Channel not found' })
            }

            // Find the invite record in the ChannelUser pivot table
            const inviteRecord = await ChannelUser.query()
                .where('user_id', userId)
                .andWhere('channel_id', channel.id)
                .andWhere('role', MembershipRole.MEMBER)
                .andWhere('status', MembershipStatus.INVITED) // Check if status is "invited"
                .first()

            if (!inviteRecord) {
                return response.notFound({ message: 'Invite not found or access denied' })
            }

            // Update the invite status to 'ACTIVE'
            inviteRecord.status = MembershipStatus.ACTIVE
            await inviteRecord.save()

            return response.accepted({ channel: { ...inviteRecord, name: channel.name } })
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
            const channel = await Channel.query().where('name', channelName).first()
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
            await inviteRecord.delete()

            return response.ok({ message: 'Invite rejected successfully' })
        } catch (error) {
            return response.internalServerError({
                message: 'Error rejecting channel invite',
                error: error.message,
            })
        }
    }
}
