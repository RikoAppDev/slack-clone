import { HttpContext } from '@adonisjs/core/http'
import Message from '../models/message.ts'

export default class MessageController {
    public async addMessage({ request, response, auth }: HttpContext) {
        try {
            const data = request.only(['content', 'channel_id'])

            // Create a new message record
            const message = await Message.create({
                content: data.content,
                sender_id: auth.user?.$attributes.id,
                channel_id: data.channel_id,
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
}
