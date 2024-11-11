import type { HttpContext } from '@adonisjs/core/http'
import ChannelUser from '#models/channel_user'
import { MembershipStatus } from '#models/enum'

export default class InvitesController {
    async accept({ response, auth, request }: HttpContext) {
        try {
            const userId = auth.user?.id
            if (!userId) {
                return response.unauthorized({ message: 'User not authenticated' })
            }

            const { channelName } = request.all()

            const inviteRecord = await ChannelUser.query()
                .preload('channel', (channelQuery) => {
                    channelQuery.where('name', channelName).select('id')
                })
                .where('userId', userId)
                .andWhere('channelId', 'id')
                .first()

            if (!inviteRecord) {
                return response.notFound({ message: 'Invite not found or access denied' })
            }

            inviteRecord.status = MembershipStatus.ACTIVE

            await inviteRecord.save()

            return response.accepted({ message: 'Invite accepted successfully' })
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

            const inviteRecord = await ChannelUser.query()
                .preload('channel', (channelQuery) => {
                    channelQuery.where('name', channelName).select('id')
                })
                .where('userId', userId)
                .andWhere('channelId', 'id')
                .first()

            if (!inviteRecord) {
                return response.notFound({ message: 'Invite not found or access denied' })
            }

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
