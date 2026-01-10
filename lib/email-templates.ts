// Email template for admin invitation
export function getAdminInvitationEmailTemplate(loginUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="mn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Админ эрх олгогдлоо</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

                    <!-- Header with brand color -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8a8e75 0%, #6d7060 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                Админ эрх олгогдлоо
                            </h1>
                        </td>
                    </tr>

                    <!-- Content Area -->
                    <tr>
                        <td style="background-color: #f5f3ee; padding: 40px 30px;">
                            <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; border: 2px solid #8a8e75;">
                                <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 22px; font-weight: 600;">
                                    Админ эрх олгогдлоо
                                </h2>

                                <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                                    Сайн байна уу,
                                </p>

                                <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                                    Таныг манай систем рүү <strong style="color: #8a8e75;">админ эрхтэйгээр</strong> нэвтрэхээр урьж байна.
                                </p>

                                <div style="background-color: #f5f3ee; padding: 20px; border-radius: 8px; border-left: 4px solid #8a8e75; margin: 20px 0;">
                                    <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.5;">
                                        <strong style="color: #8a8e75;">Анхаарна уу:</strong> Нэвтрэхдээ зөвхөн <strong>Google акаунт</strong> ашиглана. Энэ имэйл хаягаар бүртгэлтэй Google акаунтаар нэвтэрнэ үү.
                                    </p>
                                </div>

                                <p style="margin: 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                                    Нэвтрэхийн тулд доорх товч дээр дарна уу:
                                </p>

                                <!-- CTA Button -->
                                <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="${loginUrl}"
                                               style="display: inline-block; background: linear-gradient(135deg, #8a8e75 0%, #6d7060 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 17px; font-weight: 600; box-shadow: 0 4px 12px rgba(138, 142, 117, 0.3); transition: all 0.3s ease;">
                                                Нэвтрэх
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 20px 0 10px 0; color: #6a6a6a; font-size: 14px; line-height: 1.5;">
                                    Эсвэл доорх холбоосыг хуулж browser дээрээ нээнэ үү:
                                </p>

                                <div style="background-color: #f5f3ee; padding: 12px; border-radius: 6px; margin: 10px 0;">
                                    <a href="${loginUrl}" style="color: #8a8e75; text-decoration: none; font-size: 14px; word-break: break-all;">
                                        ${loginUrl}
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 30px; text-align: center; border-top: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 10px 0; color: #9a9a9a; font-size: 13px; line-height: 1.5;">
                                Энэ имэйл нь автоматаар илгээгдсэн болно.
                            </p>
                            <p style="margin: 0; color: #9a9a9a; font-size: 13px; line-height: 1.5;">
                                Хэрэв танд энэ эрх шаардлагагүй бол энэ имэйлийг үл хэрэгсэх эсвэл системийн администратортай холбогдоно уу.
                            </p>

                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                                <p style="margin: 0; color: #8a8e75; font-size: 14px; font-weight: 600;">
                                    © 2026 Coaching Website
                                </p>
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `.trim();
}

// Plain text version for email clients that don't support HTML
export function getAdminInvitationEmailText(loginUrl: string): string {
  return `
Админ эрх олгогдлоо
=====================

Сайн байна уу,

Таныг манай систем рүү админ эрхтэйгээр нэвтрэхээр урьж байна.

Анхаарна уу: Нэвтрэхдээ зөвхөн Google акаунт ашиглана. Энэ имэйл хаягаар бүртгэлтэй Google акаунтаар нэвтэрнэ үү.

Нэвтрэхийн тулд доорх холбоосыг browser дээрээ нээнэ үү:

${loginUrl}

---

Энэ имэйл автоматаар илгээгдсэн болно.

Хэрэв танд энэ эрх шаардлагагүй бол энэ имэйлийг үл хэрэгсэх эсвэл системийн администратортай холбогдоно уу.

© 2026 Coaching Website
  `.trim();
}
