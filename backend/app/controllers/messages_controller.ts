import { HttpContext } from '@adonisjs/core/http'
import Message from '../models/message.ts'
import Channel from '../models/channel.ts'

export default class MessageController {
    async create({ request, response, auth }: HttpContext) {
        try {
            const data = request.only(['content'])
            const channelName = request.param('channel_name')

            // Find the channel by name
            const channel = await Channel.query().where('name', channelName).firstOrFail()

            // Create a new message record
            const message = await Message.create({
                content: data.content,
                sender_id: auth.user?.$attributes.id,
                channel_id: channel.id,
            })

            return response.status(201).json({
                message: 'Message added successfully',
                data: message,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'Error adding message',
                error: error.message,
            })
        }
    }

    async retrieve({ request, response }: HttpContext) {
        try {
            const channelName = request.param('channel_name')
            const page = request.input('page', 1)
            const pageSize = request.input('pageSize', 15)

            // Find the channel by name
            const channel = await Channel.query().where('name', channelName).firstOrFail()

            // Retrieve messages by channel ID with pagination
            const messages = await Message.query()
                .where('channel_id', channel.id)
                .orderBy('sent_at', 'desc')
                .paginate(page, pageSize)

            return response.status(200).json({
                message: 'Messages retrieved successfully',
                data: messages,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'Error retrieving messages',
                error: error.message,
            })
        }
    }
}
