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
                this.io?.to(channel).emit('receiveMessage', message, username, channel)
            })

            socket.on('invitation', ({ channel, username }) => {
                this.io?.emit('receiveInvite', channel, username)
            })
            
            socket.on('deleteChannel', (channelName) => {
                this.io?.to(channelName).emit('channelDeleted', channelName)
            })

            socket.on('updateUser', ({ channel, user, isAdd }) => {
                this.io?.to(channel.name).emit('userUpdated', channel, user, isAdd )
            })

            socket.on('typing', ({ channel, username, message }) => {
                this.io?.to(channel).emit('userTyping', { username, message });
              });
        })
    }
}

export default new Ws()
