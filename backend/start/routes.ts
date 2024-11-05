/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const MessageController = () => import('#controllers/messages_controller')

router.post('/messages', [MessageController, 'addMessage'])
