import { DatabaseService } from '~/server/utils/databaseService'

function formatMailError(error: unknown): string {
    if (error instanceof Error) {
        const details = error as Error & { code?: string; responseCode?: number }
        const parts = [details.message]
        if (details.code) parts.push(`code=${details.code}`)
        if (details.responseCode) parts.push(`responseCode=${details.responseCode}`)
        return parts.join(' | ')
    }

    return 'Unknown error'
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, surname, email, message, phone_number } = body

    if (!name || !surname || !email || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name, surname, email, and message are required',
        })
    }

    const entry = {
        name,
        surname,
        email,
        phone_number: typeof phone_number === 'string' ? phone_number : null,
        message,
    }

    const saveContact = (status: 'success' | 'error', error: string | null) => {
        try {
            DatabaseService.saveContactEmail({
                ...entry,
                status,
                error,
            })
        } catch (dbError) {
            console.error('Error saving contact email:', dbError)
        }
    }

    try {
        const { sendMail } = await import('@/services/mailService')
        await sendMail(body)
        saveContact('success', null)
        return {
            status: 'success',
        }
    } catch (error) {
        console.error('Error sending email:', error)
        saveContact('error', formatMailError(error))

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        })
    }
})
