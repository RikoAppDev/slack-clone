import app from '@adonisjs/core/services/app'
import Ws from '#services/ws'

app.ready(() => {
    Ws.boot()
})
