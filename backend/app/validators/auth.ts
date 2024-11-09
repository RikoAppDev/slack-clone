import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerAuthValidator = vine.compile(
    vine.object({
        firstname: vine.string().trim(),
        lastname: vine.string().trim(),
        username: vine.string().trim(),
        email: vine.string().trim().email(),
        password,
    })
)

export const loginAuthValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email(),
        password,
    })
)
