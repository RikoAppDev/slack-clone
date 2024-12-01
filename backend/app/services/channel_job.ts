import { BaseScheduler } from '@adonisjs/core/scheduler'
import Channel from '#models/channel'
import { DateTime } from 'luxon'
import Ws from '#services/ws'

export default class ChannelCleanupScheduler extends BaseScheduler {
  public static schedule = '0 0 * * *'

  public async handle() {
    try {
      // Get date 30 days ago
      const thirtyDaysAgo = DateTime.now().minus({ days: 30 })

      // Find inactive channels
      const inactiveChannels = await Channel.query()
        .where('last_activity_at', '<', thirtyDaysAgo.toSQL())

      // Delete each inactive channel and notify connected clients
      for (const channel of inactiveChannels) {
        // Notify clients before deletion
        Ws.io?.emit('channelDeleted', channel.name)
        await channel.delete()
      }

    } catch (error) {
      console.error('Error cleaning up inactive channels:', error)
    }
  }
}