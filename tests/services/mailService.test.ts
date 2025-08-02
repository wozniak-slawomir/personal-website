// Mock nodemailer - this needs to be done before any imports
const mockTransporter = {
  sendMail: jest.fn().mockResolvedValue({
    messageId: 'test-message-id',
    accepted: ['receiver@example.com'],
    rejected: [],
    response: '250 OK: Message accepted'
  })
}

const mockCreateTransport = jest.fn(() => mockTransporter)

jest.doMock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: mockCreateTransport
  }
}))

describe('mailService', () => {
  const mockContactInfo = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    message: 'This is a test message.'
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    mockTransporter.sendMail.mockResolvedValue({
      messageId: 'test-message-id',
      accepted: ['receiver@example.com'],
      rejected: [],
      response: '250 OK: Message accepted'
    })
  })

  it('should send email with correct configuration', async () => {
    // Import after mocking
    const { sendMail } = await import('~/services/mailService')
    
    const result = await sendMail(mockContactInfo)
    
    expect(mockCreateTransport).toHaveBeenCalledWith({
      host: 'test-host',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'test-pass'
      }
    })
    
    expect(result.messageId).toBe('test-message-id')
  })

  it('should generate correct HTML content', async () => {
    const { sendMail } = await import('~/services/mailService')
    
    await sendMail(mockContactInfo)
    
    expect(mockTransporter.sendMail).toHaveBeenCalled()
    const callArgs = mockTransporter.sendMail.mock.calls[0][0]
    expect(callArgs.html).toContain('John Doe')
    expect(callArgs.html).toContain('john.doe@example.com')
    expect(callArgs.html).toContain('+1234567890')
    expect(callArgs.html).toContain('This is a test message.')
  })

  it('should generate correct text content', async () => {
    const { sendMail } = await import('~/services/mailService')
    
    await sendMail(mockContactInfo)
    
    const callArgs = mockTransporter.sendMail.mock.calls[0][0]
    expect(callArgs.text).toBe(
      'Contact from: John Doe\nEmail: john.doe@example.com\nPhone: +1234567890\n\nMessage:\nThis is a test message.'
    )
  })

  it('should handle transporter errors', async () => {
    // Set up error for this specific test
    mockTransporter.sendMail.mockRejectedValueOnce(new Error('SMTP connection failed'))
    
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
          pass: 'test-pass'
        })
      })
    )
  })
})