# Email Тохиргоо - Админ Урилга Илгээх

Админ хэрэглэгч нэмэх үед автоматаар урилгын имэйл илгээх системийн тохиргооны заавар.

## 🎯 Юу хийх вэ?

Админ нэмэхэд тэр хүн рүү дараах агуулга бүхий имэйл илгээгдэнэ:
- "Та админ боллоо" гэсэн мэдээлэл
- "Нэвтрэх" товч (өнгө: main #8a8e75, secondary #f5f3ee)
- Товч дарахад `/admin/login` хуудас руу шилжинэ
- Google OAuth-аар нэвтрэх заавар

---

## 📧 Gmail App Password авах (Хамгийн хялбар арга)

### 1. Google Account Settings руу орох
1. https://myaccount.google.com руу очно уу
2. Баруун дээд буланд байгаа профайл зургаа дээр дарж **Manage your Google Account** сонгоно уу

### 2. 2-Step Verification асаах
1. Зүүн талын menu-с **Security** сонгоно уу
2. "How you sign in to Google" хэсэгт **2-Step Verification** олоод дарна уу
3. Хэрэв асаагүй бол **Turn on** дарж асаана уу
4. Утасны дугаараа баталгаажуулна уу

### 3. App Password үүсгэх
1. Security хуудас дээр буцаад очно уу
2. **App passwords** гэдгийг хайж олоод дарна уу
   - Хэрэв олдохгүй бол 2-Step Verification зөв асаагдсан эсэхийг шалгана уу
3. "Select app" dropdown-с **Mail** сонгоно уу
4. "Select device" dropdown-с **Other (Custom name)** сонгоно уу
5. Нэрийг "Coaching Website Admin" гэж оруулаад **Generate** дарна уу
6. **16 оронтой код** гарч ирнэ (жишээ: `abcd efgh ijkl mnop`)
7. Энэ кодыг хуулж авна уу (зайг нь авч хаяж болно: `abcdefghijklmnop`)

### 4. .env файлд нэмэх
`.env.local` файл үүсгээд дараах мэдээллийг оруулна уу:

```env
# Gmail Configuration
GMAIL_USER=tanii-gmail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Анхаарах зүйлс:**
- `GMAIL_USER` - Өөрийн Gmail хаяг
- `GMAIL_APP_PASSWORD` - Дээр үүсгэсэн 16 оронтой App Password (зай авч хаяна)
- `NEXT_PUBLIC_SITE_URL` - Production дээр domain name байна (жишээ: `https://yourwebsite.com`)

---

## 🔒 Аюулгүй байдал

⚠️ **МАШ ЧУХАЛ:**
- `.env.local` файлыг **ХЭЗЭЭ Ч** git-д commit хийж болохгүй!
- `.gitignore` файлд `.env.local` байгаа эсэхийг шалгана уу
- App Password-оо хэнд ч битгий өгөөрэй
- Production дээр environment variables-г hosting service дээрээ тохируулна уу (Vercel, Netlify гэх мэт)

---

## ✅ Турших

### 1. .env.local файл үүсгэх
Project root folder дээр `.env.local` файл үүсгээд дараах мэдээллийг оруулна уу:
```env
GMAIL_USER=tanii-gmail@gmail.com
GMAIL_APP_PASSWORD=tanii-16-digit-app-password

# Үндсэн админ (устгагдахгүй, автоматаар үүснэ)
DEFAULT_ADMIN_EMAIL=tanii-admin@gmail.com
NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL=tanii-admin@gmail.com

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ Анхаарах:**
- `DEFAULT_ADMIN_EMAIL` болон `NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL` - Үндсэн админы имэйл хаяг
- Энэ админ автоматаар database-д үүснэ
- Энэ админыг устгах боломжгүй (хамгаалагдсан)
- Хоёр variable ижилхэн утга байх ёстой!

### 2. Development server ажиллуулах
```bash
yarn dev
```

### 3. Админ нэмэх
1. http://localhost:3000/admin/users руу очно уу
2. Gmail хаяг оруулаад "Админ нэмэх" товч дээр дарна уу
3. Амжилттай бол:
   - ✅ "Админ хэрэглэгч амжилттай нэмэгдлээ. Урилгын имэйл илгээгдлээ! 📧"
4. Алдаа гарвал:
   - ❌ "Урилгын имэйл илгээхэд алдаа гарлаа"
   - Console (F12) дээр алдааны дэлгэрэнгүйг харна уу

### 4. Email шалгах
1. Нэмсэн Gmail хаяг руугаа очно уу
2. "Админ эрх олгогдлоо - Coaching Website" гэсэн имэйл ирсэн байх ёстой
3. "Нэвтрэх" товч дээр дарна уу
4. Login хуудас руу шилжих ёстой

---

## 🐛 Түгээмэл алдаанууд

### "Invalid login" эсвэл "Username and Password not accepted"
- **Шалтгаан:** App Password буруу эсвэл ердийн нууц үг хэрэглэсэн
- **Шийдэл:** App Password дахин үүсгээд зөв хуулсан эсэхийг шалгана уу

### "Connection timeout" эсвэл "ETIMEDOUT"
- **Шалтгаан:** Firewall эсвэл network асуудал
- **Шийдэл:**
  - Port 587 нээлттэй эсэхийг шалгана уу
  - Өөр WiFi/network дээр туршина уу

### "Self signed certificate" алдаа
- **Шалтгаан:** SSL certificate асуудал
- **Шийдэл:** `EMAIL_PORT=587` байгаа эсэхийг шалгана уу (465 биш!)

### Email ирэхгүй байна
- **Spam хавтас шалгах:** Gmail-н Spam folder харна уу
- **Email хаяг зөв эсэх:** Console дээр "Email sent successfully: <messageId>" гарсан эсэхийг харна уу
- **Gmail sending limits:** Gmail-н өдрийн хязгаарлалт (ойролцоогоор 500 имэйл/өдөр)

---

## 📝 Зөвхөн Gmail дэмждэг

⚠️ **Анхаар:** Энэ систем нь зөвхөн **Gmail** ашигладаг. Бусад email service (Outlook, Yahoo гэх мэт) ашиглах бол `app/api/send-admin-invitation/route.ts` файлыг өөрчлөх шаардлагатай.

---

## 🚀 Production дээр тохируулах

### Vercel
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Дараах variables-г нэмнэ:
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   DEFAULT_ADMIN_EMAIL=your-admin@gmail.com
   NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL=your-admin@gmail.com
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### Netlify
1. Site settings → Environment variables
2. Дээрх variables-г нэмнэ

---

## 💡 Нэмэлт мэдээлэл

### Email template өнгө солих
`lib/email-templates.ts` файлд:
- `#8a8e75` - Үндсэн өнгө (main)
- `#f5f3ee` - Дэвсгэр өнгө (secondary)

### Email агуулга өөрчлөх
`lib/email-templates.ts` файлын `getAdminInvitationEmailTemplate()` функц руу очоод HTML-г засна уу.

### Test email илгээх
Browser Console дээр:
```javascript
fetch('/api/send-admin-invitation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@gmail.com' })
}).then(r => r.json()).then(console.log)
```

---

## 📞 Тусламж хэрэгтэй бол

Асуудал гарвал:
1. Browser Console (F12) нээгээд алдааг шалгана уу
2. Server logs харна уу (`yarn dev`-н output)
3. `.env.local` файл зөв бичигдсэн эсэхийг шалгана уу
4. Gmail App Password дахин үүсгэж үзнэ үү

Амжилт хүсье! 🎉
