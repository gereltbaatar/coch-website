import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getAdminInvitationEmailTemplate, getAdminInvitationEmailText } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Имэйл хаяг шаардлагатай' },
        { status: 400 }
      )
    }

    // Validate Gmail credentials
    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailAppPassword) {
      console.error('Gmail credentials not configured')
      return NextResponse.json(
        { error: 'Gmail тохиргоо дутуу байна. GMAIL_USER болон GMAIL_APP_PASSWORD шаардлагатай.' },
        { status: 500 }
      )
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    // Verify connection
    await transporter.verify()

    // Get login URL
    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login`

    // Send email
    const info = await transporter.sendMail({
      from: `"Coaching Website Admin" <${gmailUser}>`,
      to: email,
      subject: 'Админ эрх олгогдлоо - Coaching Website',
      text: getAdminInvitationEmailText(loginUrl),
      html: getAdminInvitationEmailTemplate(loginUrl),
    })

    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Имэйл амжилттай илгээгдлээ',
      messageId: info.messageId,
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      {
        error: 'Имэйл илгээхэд алдаа гарлаа',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
