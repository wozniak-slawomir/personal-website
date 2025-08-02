// Mock the mail service
jest.mock('~/services/mailService', () => ({
  sendMail: jest.fn()
}))

// Mock Nuxt server utilities - these are already mocked in setup.ts

describe('server/api/contact.post', () => {
  let contactHandler: any
  
  beforeAll(async () => {
    // Import the handler after mocks are set up
    const module = await import('~/server/api/contact.post')
    contactHandler = module.default
  })

  const validContactData = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
    message: 'This is a test message.'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Setup default mocks
    global.readBody = jest.fn()
    global.createError = jest.fn()
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
    global.readBody.mockResolvedValue(JSON.stringify(validContactData))
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(global.readBody).toHaveBeenCalledWith(mockEvent)
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
    
    global.readBody.mockResolvedValue(JSON.stringify(invalidData))
    global.createError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(global.createError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should return error for missing surname', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.surname
    
    global.readBody.mockResolvedValue(JSON.stringify(invalidData))
    global.createError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(global.createError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should return error for missing email', async () => {
    const invalidData = { ...validContactData }
    delete invalidData.email
    
    global.readBody.mockResolvedValue(JSON.stringify(invalidData))
    global.createError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(global.createError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })

  it('should handle service error gracefully', async () => {
    const { sendMail } = require('~/services/mailService')
    sendMail.mockRejectedValue(new Error('SMTP connection failed'))
    
    global.readBody.mockResolvedValue(JSON.stringify(validContactData))
    global.createError.mockReturnValue({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(consoleSpy).toHaveBeenCalledWith('Error sending email:', expect.any(Error))
    expect(global.createError).toHaveBeenCalledWith({
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
    
    global.readBody.mockResolvedValue(JSON.stringify(invalidData))
    global.createError.mockReturnValue({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
    
    const mockEvent = {}
    const result = await contactHandler(mockEvent)
    
    expect(global.createError).toHaveBeenCalledWith({
      statusCode: 400,
      statusMessage: 'Name, surname, email, phone number, and message are required'
    })
  })
})