import { HttpContext } from '@adonisjs/core/http'
import Channel from '../models/channel.ts'

export default class ChannelController {
    async retrieve({ response, auth }: HttpContext) {
        try {
            const userId = auth.user?.$attributes.id

            // Retrieve channels for the logged-in user
            const channels = await Channel.query()
                .where('user_id', userId)
                .orderBy('created_at', 'desc')

            return response.status(200).json({
                message: 'Channels retrieved successfully',
                data: channels,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'Error retrieving channels',
                error: error.message,
            })
        }
    }
}
