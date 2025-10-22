'use client'

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export interface PromiseData {
  success: boolean
  message: string
}

export const emailSend = async (data: EmailData): Promise<PromiseData> => {
  try {
    console.log('Sending email:', data)

    // ✅ use NEXT_PUBLIC_ variables so they’re available in the browser
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
    const templateId1 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_1 as string
    const templateId2 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2 as string
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string

    if (!serviceId || !templateId1 || !publicKey) {
      throw new Error('EmailJS environment variables are missing.')
    }

    // ✅ First email — send to yourself (or contact address)
    const result = await emailjs.send(
      serviceId,
      templateId1,
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
      { publicKey }
    )

    console.log('EmailJS result:', result)

    if (result.text !== 'OK') {
      return {
        success: false,
        message: 'Failed to send message. Please try again or email me directly.',
      }
    }

    // ✅ Second email — auto reply to sender (optional)
    if (templateId2) {
      await emailjs.send(
        serviceId,
        templateId2,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        { publicKey }
      )
    }

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    }
  } catch (err) {
    console.error('EMAILJS ERROR:', err)

    if (err instanceof EmailJSResponseStatus) {
      console.error('EMAILJS FAILED RESPONSE:', err)
    }

    return {
      success: false,
      message:
        'Something went wrong while sending your message. Please try again later.',
    }
  }
}
