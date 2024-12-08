import { BaseJob } from '../types/job.ts'
import Channel from '#models/channel'
import { DateTime } from 'luxon'
import Ws from '../services/ws.ts'

export default class DeleteInactiveChannelsJob extends BaseJob {
  async run() {
    try {
      // Find channels where last_activity_at is older than 30 days
      const thirtyDaysAgo = DateTime.now().minus({ days: 30 })
      
      const inactiveChannels = await Channel.query()
        .where('last_activity_at', '<', thirtyDaysAgo.toSQL())

      // Delete each inactive channel
      for (const channel of inactiveChannels) {
        await channel.delete()
        const channelName = channel.name
        Ws.io?.to(channelName).emit('channelDeleted', channelName)
        console.log(`[Scheduler] - Deleted inactive channel: ${channel.name}`)
      }

    } catch (error) {
      console.error('[Scheduler] - Error deleting inactive channels:', error)
    }
  }
}