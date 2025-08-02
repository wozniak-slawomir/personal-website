import contactHandler from '~/server/api/contact.post'

// Mock the mail service
jest.mock('~/services/mailService', () => ({
  sendMail: jest.fn()
}))

// Mock Nuxt server utilities
const mockCreateError = jest.fn()
const mockReadBody = jest.fn()

global.createError = mockCreateError
global.readBody = mockReadBody

describe('server/api/contact.post', () => {
  const validContactData = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    message: 'This is a test message.'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully send email with valid data', async () => {
    const { sendMail } = require('~/services/mailService')
    const mockInfo = {
      messageId: 'test-message-id',
      accepted: ['receiver@example.com'],
      rejected: [],
      response: '250 OK: Message accepted'
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
      info: mockInfo
    })
  })

  it('should return error for missing name', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.name
    
    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should return error for missing surname', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.surname
    
    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should return error for missing email', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.email
    
    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should return error for missing phone_number', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.phone_number
    
    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should return error for missing message', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.message
    
    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should handle service error gracefully', async () => {
    const { sendMail } = require('~/services/mailService')
    sendMail.mockRejectedValue(new Error('SMTP connection failed'))
    
    mockReadBody.mockResolvedValue(JSON.stringify(validContactData))
    mockCreateError.mockReturnValue({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(consoleSpy).toHaveBeenCalledWith('Error sending email:', expect.any(Error))
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
    
    consoleSpy.mockRestore()
  })

  it('should handle empty strings as missing fields', async () => {
    const invalidData = {
      name: '',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '+1234567890',
      message: 'This is a test message.'
    }
    
    mockReadBody.mockResolvedValue(JSON.stringify(invalidData))
    mockCreateError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })
})