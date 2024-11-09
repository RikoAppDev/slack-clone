import router from '@adonisjs/core/services/router'

const MessageController = () => import('#controllers/messages_controller')
const AuthController = () => import('#controllers/auth_controller')

router.post('/messages', [MessageController, 'addMessage'])

// Authentication Routes
router
    .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
    })
    .prefix('/auth')
