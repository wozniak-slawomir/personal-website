import nodemailer from 'nodemailer'

interface ContactInfo {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  message: string;
}

export const sendMail = async (contactInfo: ContactInfo) => {
  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.VITE_SMTP_HOST,
    port: Number(config.VITE_SMTP_PORT),
    secure: false,
    auth: {
      user: config.VITE_SMTP_USER,
      pass: config.VITE_SMTP_PASS,
    },
  })

  const { name, surname, email, phone_number, message } = contactInfo

  const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New message from website!</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .email-container {
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                }
                .email-header {
                    background: #252525;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .email-body {
                    padding: 20px;
                    background-color: #ffffff;
                }
                .contact-info {
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #e0e0e0;
                }
                .contact-info p {
                    margin: 5px 0;
                }
                .message-content {
                    white-space: pre-wrap;
                }
                .email-footer {
                    text-align: center;
                    padding: 15px;
                    font-size: 12px;
                    color: #777;
                    background-color: #f7f7f7;
                    border-top: 1px solid #e0e0e0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h2>New message from website!</h2>
                </div>
                <div class="email-body">
                    <div class="contact-info">
                        <p><strong>Name:</strong> ${name} ${surname}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone_number}</p>
                    </div>
                    <div class="message-content">
                        ${message}
                    </div>
                </div>
                <div class="email-footer">
                    <p>&copy; ${new Date().getFullYear()} Slawomir Wozniak. All rights reserved.</p>
                </div>
            </div>
        </body>
    </html>
    `

  const info = await transporter.sendMail({
    from: `"No Reply" <${config.VITE_SENDER_MAIL}>`,
    to: config.VITE_MAIL_RECEIVER,
    subject: 'New message from website!',
    text: `Contact from: ${name} ${surname}\nEmail: ${email}\nPhone: ${phone_number}\n\nMessage:\n${message}`,
    html: htmlContent,
  })

  return info
}
