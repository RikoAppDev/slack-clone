import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MessageController = () => import('#controllers/messages_controller')
const AuthController = () => import('#controllers/auth_controller')
const ChannelController = () => import('#controllers/channel_controller')

// Message Routes
router
    .group(() => {
        router.post('create', [MessageController, 'create'])
        router.get('retrieve', [MessageController, 'retrieve'])
    })
    .prefix('/channels/:channel_name/messages')

// Channel Routes
router
    .group(() => {
        router.get('retrieve', [ChannelController, 'retrieve']).as('channels.retrieve')
        router.post('create', [ChannelController, 'create']).as('channels.create')
        router.delete(':name/delete', [ChannelController, 'delete']).as('channels.delete')
    })
    .prefix('/channels')
    .use(middleware.auth())
    .as('channels')

// Authentication Routes
router
    .group(() => {
        router.post('register', [AuthController, 'register']).as('auth.register')
        router.post('login', [AuthController, 'login']).as('auth.login')
        router.delete('logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
        router.delete('me', [AuthController, 'me']).as('auth.me')
    })
    .prefix('/auth')
    .as('auth')
