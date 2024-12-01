import { Server } from 'socket.io'
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

            socket.on('invitation', ({ channel, username }) => {
                this.io?.emit('receiveInvite', channel, username)
            })
            
            socket.on('deleteChannel', (channel) => {
                this.io?.to(channel).emit('channelDeleted', channel)
            })

            socket.on('updateUser', ({ channel, user, isAdd }) => {
                this.io?.to(channel.name).emit('userUpdated', channel, user, isAdd )
            })
        })
    }
}

export default new Ws()
