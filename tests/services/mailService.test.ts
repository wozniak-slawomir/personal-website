import { sendMail } from '~/services/mailService'

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransporter: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'test-message-id',
      accepted: ['receiver@example.com'],
      rejected: [],
      response: '250 OK: Message accepted'
    })
  })
}))

describe('mailService', () => {
  const mockContactInfo = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    message: 'This is a test message.'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send email with correct configuration', async () => {
    const nodemailer = require('nodemailer')
    const mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({
        messageId: 'test-message-id',
        accepted: ['receiver@example.com'],
        rejected: [],
        response: '250 OK: Message accepted'
      })
    }
    
    nodemailer.createTransporter = jest.fn().mockReturnValue(mockTransporter)
    
    const result = await sendMail(mockContactInfo)
    
    expect(nodemailer.createTransporter).toHaveBeenCalledWith({
      host: 'test-host',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'test-pass'
      }
    })
    
    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: '"No Reply" <sender@example.com>',
      to: 'receiver@example.com',
      subject: 'New message from website!',
      text: 'Contact from: John Doe\nEmail: john.doe@example.com\nPhone: +1234567890\n\nMessage:\nThis is a test message.',
      html: expect.stringContaining('John Doe')
    })
    
    expect(result.messageId).toBe('test-message-id')
  })

  it('should generate correct HTML content', async () => {
    const nodemailer = require('nodemailer')
    const mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({
        messageId: 'test-message-id'
      })
    }
    
    nodemailer.createTransporter = jest.fn().mockReturnValue(mockTransporter)
    
    await sendMail(mockContactInfo)
    
    const htmlContent = mockTransporter.sendMail.mock.calls[0][0].html
    
    expect(htmlContent).toContain('John Doe')
    expect(htmlContent).toContain('john.doe@example.com')
    expect(htmlContent).toContain('+1234567890')
    expect(htmlContent).toContain('This is a test message.')
    expect(htmlContent).toContain('New message from website!')
    expect(htmlContent).toContain('Slawomir Wozniak')
  })

  it('should generate correct text content', async () => {
    const nodemailer = require('nodemailer')
    const mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({
        messageId: 'test-message-id'
      })
    }
    
    nodemailer.createTransporter = jest.fn().mockReturnValue(mockTransporter)
    
    await sendMail(mockContactInfo)
    
    const textContent = mockTransporter.sendMail.mock.calls[0][0].text
    
    expect(textContent).toBe(
      'Contact from: John Doe\nEmail: john.doe@example.com\nPhone: +1234567890\n\nMessage:\nThis is a test message.'
    )
  })

  it('should handle transporter errors', async () => {
    const nodemailer = require('nodemailer')
    const mockTransporter = {
      sendMail: jest.fn().mockRejectedValue(new Error('SMTP connection failed'))
    }
    
    nodemailer.createTransporter = jest.fn().mockReturnValue(mockTransporter)
    
    await expect(sendMail(mockContactInfo)).rejects.toThrow('SMTP connection failed')
  })

  it('should use runtime config values', async () => {
    const nodemailer = require('nodemailer')
    const mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test' })
    }
    
    nodemailer.createTransporter = jest.fn().mockReturnValue(mockTransporter)
    
    await sendMail(mockContactInfo)
    
    expect(nodemailer.createTransporter).toHaveBeenCalledWith(
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