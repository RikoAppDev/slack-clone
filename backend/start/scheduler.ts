import SchedulerService from '#services/scheduler_service'
import DeleteInactiveChannelsJob from '../app/jobs/delete_channel.ts'

const scheduler = new SchedulerService()

// Run every minute to check for inactive channels
scheduler.addJob({
  key: 'delete-inactive-channels',
  cronExpression: '* * * * *',
  job: new DeleteInactiveChannelsJob(),
})

scheduler.scheduleAllJobs()