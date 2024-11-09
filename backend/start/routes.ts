import router from '@adonisjs/core/services/router'

const MessageController = () => import('#controllers/messages_controller')
const AuthController = () => import('#controllers/auth_controller')

// Message Routes
router
    .group(() => {
        router.post('create', [MessageController, 'create'])
        router.get('retrieve', [MessageController, 'retrieve'])
    })
    .prefix('/channels/:channel_name/messages')

// Authentication Routes
router
    .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
    })
    .prefix('/auth')
