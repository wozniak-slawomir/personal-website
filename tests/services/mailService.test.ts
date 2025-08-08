import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

type MailOptions = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

type SendResult = { messageId: string; accepted: string[]; rejected: string[]; response: string }

type Transporter = {
  sendMail: (opts: MailOptions) => Promise<SendResult>
}

// Hoist runtime config mock so it's active before service import
vi.hoisted(() => {
  mockNuxtImport('useRuntimeConfig', () => () => ({
    VITE_SMTP_HOST: 'test-host',
    VITE_SMTP_PORT: '587',
    VITE_SMTP_USER: 'test@example.com',
    VITE_SMTP_PASS: 'test-pass',
    VITE_MAIL_RECEIVER: 'receiver@example.com',
    VITE_SENDER_MAIL: 'sender@example.com',
  }))
})

const sendMailMock = vi.fn<Transporter['sendMail']>()

const mockTransporter: Transporter = {
  sendMail: sendMailMock,
}

const mockCreateTransport = vi.fn(() => mockTransporter)

vi.mock('nodemailer', () => ({
  default: {
    createTransport: mockCreateTransport,
  },
}))

describe('mailService', () => {
  const mockContactInfo = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    message: 'This is a test message.',
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    sendMailMock.mockResolvedValue({
      messageId: 'test-message-id',
      accepted: ['receiver@example.com'],
      rejected: [],
      response: '250 OK: Message accepted',
    })
  })

  it('should send email with correct configuration', async () => {
    const { sendMail } = await import('~/services/mailService')

    const result = await sendMail(mockContactInfo)

    expect(mockCreateTransport).toHaveBeenCalledWith({
      host: 'test-host',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'test-pass',
      },
    })

    expect(result.messageId).toBe('test-message-id')
  })

  it('should generate correct HTML content', async () => {
    const { sendMail } = await import('~/services/mailService')

    await sendMail(mockContactInfo)

    expect(sendMailMock).toHaveBeenCalled()
    const callArgs = (sendMailMock as Mock).mock.calls[0][0] as MailOptions
    expect(callArgs.html).toContain('John Doe')
    expect(callArgs.html).toContain('john.doe@example.com')
    expect(callArgs.html).toContain('+1234567890')
    expect(callArgs.html).toContain('This is a test message.')
  })

  it('should generate correct text content', async () => {
    const { sendMail } = await import('~/services/mailService')

    await sendMail(mockContactInfo)

    const callArgs = (sendMailMock as Mock).mock.calls[0][0] as MailOptions
    expect(callArgs.text).toBe(
      'Contact from: John Doe\nEmail: john.doe@example.com\nPhone: +1234567890\n\nMessage:\nThis is a test message.',
    )
  })

  it('should handle transporter errors', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('SMTP connection failed'))

    const { sendMail } = await import('~/services/mailService')

    await expect(sendMail(mockContactInfo)).rejects.toThrow('SMTP connection failed')
  })

  it('should use runtime config values', async () => {
    const { sendMail } = await import('~/services/mailService')

    await sendMail(mockContactInfo)

    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'test-host',
        port: 587,
        auth: expect.objectContaining({
          user: 'test@example.com',
          pass: 'test-pass',
        }),
      }),
    )
  })
})