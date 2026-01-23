export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, surname, email, message } = body

    if (!name || !surname || !email || !message) {
        return createError({
            statusCode: 400,
            statusMessage: 'Name, surname, email, and message are required',
        })
    }

    try {
        const { sendMail } = await import('@/services/mailService')
        const info = await sendMail(body)
        return {
            status: 'success',
            message: 'Email sent successfully',
            info,
        }
    } catch (error) {
        console.error('Error sending email:', error)
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        })
    }
})
