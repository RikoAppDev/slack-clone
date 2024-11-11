import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MessageController = () => import('#controllers/messages_controller')
const AuthController = () => import('#controllers/auth_controller')
const ChannelController = () => import('#controllers/channel_controller')
const InvitesController = () => import('#controllers/invites_controller')

// Message Routes
router
    .group(() => {
        router.post('create', [MessageController, 'create'])
        router.get('retrieve', [MessageController, 'retrieve'])
    })
    .prefix('/channels/:channel_name/messages')
    .use(middleware.auth())

router
    .group(() => {
        router.put('accept', [InvitesController, 'accept']).as('invite.accept')
        router.delete('reject', [InvitesController, 'reject']).as('invite.reject')
    })
    .prefix('/invite')
    .use(middleware.auth())
    .as('invite')

// Channel Routes
router
    .group(() => {
        router.get('retrieve', [ChannelController, 'retrieve']).as('channels.retrieve')
        router.post('create', [ChannelController, 'create']).as('channels.create')
        router.delete('delete', [ChannelController, 'delete']).as('channels.delete')
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
        router.get('me', [AuthController, 'me']).as('auth.me').use(middleware.auth())
    })
    .prefix('/auth')
    .as('auth')
