import { scheduler } from '@adonisjs/core/scheduler'
import ChannelCleanupScheduler from '#schedulers/channel_cleanup'

scheduler.add([ChannelCleanupScheduler])