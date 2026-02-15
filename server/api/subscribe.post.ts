import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    })
  }

  const { email, name } = body

  // Create authentication header
  const auth = Buffer.from(
    `${config.LISTMONK_API_USER}:${config.LISTMONK_API_TOKEN}`
  ).toString('base64')

  const listmonkUrl = config.LISTMONK_API_URL || 'https://listmonk.slawomir-wozniak.pl/api'

  try {
    await $fetch(`${listmonkUrl}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: {
        email,
        name,
        status: 'enabled',
        lists: [2],
        preconfirm_subscriptions: true,
      },
    })
    
    return { success: true, message: 'Subscribed successfully' }
  } catch (error: any) {
    console.error('Listmonk API Error:', error.data || error.message)
    
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: 'Failed to subscribe',
      data: error.data,
    })
  }
})
