import { Server } from 'socket.io'
import ChannelUser from '#models/channel_user'
import server from '@adonisjs/core/services/server'

class Ws {
    io: Server | undefined
    private booted = false

    boot() {
        /**
         * Ignore multiple calls to the boot method
         */
        if (this.booted) {
            return
        }

        this.booted = true
        this.io = new Server(server.getNodeServer(), {
            cors: {
                origin: '*',
            },
        })

        this.io.on('connection', (socket) => {
            socket.on('joinChannel', (channel) => {
                socket.join(channel)
            })

            socket.on('sendMessage', ({ channel, message, username }) => {
                this.io?.to(channel).emit('receiveMessage', message, username)
            })

            socket.on('kickUser', ({ channel, username }) => {
                socket.leave(channel)
                ChannelUser.query().where('channel_id', channel).where('user_id', username).delete()
            })
        })
    }
}

export default new Ws()
