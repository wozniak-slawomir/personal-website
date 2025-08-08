import { describe, it, expect, beforeAll, beforeEach, vi, type Mock } from 'vitest'

vi.mock('~/services/mailService', () => ({
  sendMail: vi.fn(),
}))

// Helper types
type ReadBody = (event: unknown) => Promise<string>
type CreateError = (err: { statusCode: number; statusMessage: string }) => unknown

describe('server/api/contact.post', () => {
  let contactHandler: (event: unknown) => Promise<unknown>
  let mockReadBody: Mock<ReadBody>
  let mockCreateError: Mock<CreateError>

  beforeAll(async () => {
    // Provide defineEventHandler global expected by Nitro
    const g = globalThis as typeof globalThis & {
      defineEventHandler: <T>(h: (e: unknown) => T | Promise<T>) => (e: unknown) => T | Promise<T>
    }
    g.defineEventHandler = ((h) => h) as typeof g['defineEventHandler']

    // Import the handler after mocks are set up
    const module = await import('~/server/api/contact.post')
    contactHandler = module.default
  })

  const validContactData = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    message: 'This is a test message.',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockReadBody = vi.fn<ReadBody>()
    mockCreateError = vi.fn<CreateError>()
    const g = globalThis as typeof globalThis & {
      readBody: ReadBody
      createError: CreateError
    }
    g.readBody = mockReadBody
    g.createError = mockCreateError
  })

  it('should successfully send email with valid data', async () => {
    const mod = await import('~/services/mailService')
    const sendMail = (mod as { sendMail: Mock }).sendMail
    const mockInfo = {
      messageId: 'test-message-id',
      accepted: ['receiver@example.com'],
      rejected: [],
      response: '250 OK: Message accepted',
    }

    sendMail.mockResolvedValue(mockInfo)
    mockReadBody.mockResolvedValue(JSON.stringify(validContactData))

    const mockEvent = {}
    const result = await contactHandler(mockEvent)

    expect(mockReadBody).toHaveBeenCalledWith(mockEvent)
    expect(sendMail).toHaveBeenCalledWith(validContactData)
    expect(result).toEqual({
      status: 'success',
      message: 'Email sent successfully',
      info: mockInfo,
    })
  })

  it('should return error for missing name', async () => {
    const invalidData = {
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '+1234567890',
      message: 'This is a test message.',
    }

    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })

    const mockEvent = {}
    await contactHandler(mockEvent)

    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })
  })

  it('should return error for missing surname', async () => {
    const invalidData = {
      name: 'John',
      email: 'john.doe@example.com',
      phone_number: '+1234567890',
      message: 'This is a test message.',
    }

    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })

    const mockEvent = {}
    await contactHandler(mockEvent)

    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })
  })

  it('should return error for missing email', async () => {
    const invalidData = {
      name: 'John',
      surname: 'Doe',
      phone_number: '+1234567890',
      message: 'This is a test message.',
    }

    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })

    const mockEvent = {}
    await contactHandler(mockEvent)

    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })
  })

  it('should handle service error gracefully', async () => {
    const mod = await import('~/services/mailService')
    const sendMail = (mod as { sendMail: Mock }).sendMail
    sendMail.mockRejectedValue(new Error('SMTP connection failed'))

    mockReadBody.mockResolvedValue(JSON.stringify(validContactData))
    mockCreateError.mockReturnValue({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const mockEvent = {}
    await contactHandler(mockEvent)

    expect(consoleSpy).toHaveBeenCalledWith('Error sending email:', expect.any(Error))
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })

    consoleSpy.mockRestore()
  })

  it('should handle empty strings as missing fields', async () => {
    const invalidData = {
      name: '',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '+1234567890',
      message: 'This is a test message.',
    }

    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })

    const mockEvent = {}
    await contactHandler(mockEvent)

    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required',
    })
  })
})