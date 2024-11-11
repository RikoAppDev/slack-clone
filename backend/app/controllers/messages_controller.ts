import { HttpContext } from '@adonisjs/core/http'
import Message from '../models/message.ts'
import Channel from '../models/channel.ts'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class MessageController {
    async create({ request, response, auth }: HttpContext) {
        try {
            const data = request.only(['content'])
            const channelName = request.param('channel_name')

            const channel = await Channel.query().where('name', channelName).firstOrFail()

            const message = await Message.create({
                content: data.content,
                sender_id: auth.user?.$attributes.id,
                channel_id: channel.id,
                sent_at: DateTime.now(),
            })

            const [messageWithDetails] = await db
                .from('messages')
                .join('users', 'messages.sender_id', '=', 'users.id')
                .join('channels', 'messages.channel_id', '=', 'channels.id')
                .where('messages.id', message.id)
                .select(
                    'messages.content as text',
                    'users.username as name',
                    'messages.sent_at as timestamp',
                    'channels.name as channelName'
                )

            const transformedData = {
                text: messageWithDetails.text,
                name: messageWithDetails.name,
                timestamp: messageWithDetails.timestamp,
                channelName: messageWithDetails.channelName,
            }

            return response.status(201).json({
                message: 'Message added successfully',
                data: transformedData,
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

            const channel = await Channel.query().where('name', channelName).firstOrFail()

            const messages = await db
                .from('messages')
                .join('users', 'messages.sender_id', '=', 'users.id')
                .join('channels', 'messages.channel_id', '=', 'channels.id')
                .where('channels.id', channel.id)
                .select(
                    'messages.content as text',
                    'users.username as name',
                    'messages.sent_at as timestamp',
                    'channels.name as channelName'
                )
                .orderBy('messages.sent_at', 'desc')
                .paginate(page, pageSize)

            const transformedData = messages.all().map((msg) => ({
                text: msg.text,
                name: msg.name,
                timestamp: msg.timestamp,
                channelName: msg.channelName,
            }))

            return response.status(200).json({
                message: 'Messages retrieved successfully',
                data: transformedData,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'Error retrieving messages',
                error: error.message,
            })
        }
    }
}
