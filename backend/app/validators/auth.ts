import vine from '@vinejs/vine'

export const registerAuthValidator = vine.compile(
    vine.object({
        firstname: vine.string().trim(),
        lastname: vine.string().trim(),
        username: vine.string().trim(),
        email: vine.string().trim().email(),
        password: vine.string().trim().escape(),
    })
)

export const loginAuthValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().trim().escape(),
    })
)
