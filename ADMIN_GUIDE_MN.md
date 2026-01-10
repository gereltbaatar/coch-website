# Админ Системийн Тохиргоо - Хурдан Заавар

## 1. Supabase дээр admin_users хүснэгт үүсгэх

1. Supabase dashboard руу орох: https://app.supabase.com/project/amhauqdhanbnszgajqxv
2. **SQL Editor** руу очих
3. `supabase_migration_admin_users.sql` файлын агуулгыг хуулж, ажиллуулах
4. Доорх командыг ажиллуулах (эсвэл бүрэн SQL файлыг):

```sql
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id)
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on admin_users" ON admin_users
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE INDEX idx_admin_users_email ON admin_users(email);
```

## 2. Google OAuth тохируулах

### Google Cloud Console дээр:

1. [Google Cloud Console](https://console.cloud.google.com/) руу орох
2. **APIs & Services** > **Credentials** руу очих
3. **Create Credentials** > **OAuth client ID** дарах
4. OAuth consent screen тохируулах
5. OAuth Client ID үүсгэх:
   - Application type: **Web application**
   - Authorized redirect URIs: `https://amhauqdhanbnszgajqxv.supabase.co/auth/v1/callback`
6. **Client ID** болон **Client Secret** хуулж авах

### Supabase дээр:

1. Supabase dashboard руу орох
2. **Authentication** > **Providers** руу очих
3. **Google** идэвхжүүлэх
4. **Client ID** болон **Client Secret** оруулах
5. Хадгалах

## 3. Өөрийн имэйлийг админ жагсаалтанд нэмэх

Supabase дээр SQL Query ажиллуулах:

```sql
INSERT INTO admin_users (email, name)
VALUES ('таны-gmail@gmail.com', 'Таны Нэр');
```

Эсвэл Table Editor ашиглаж гараар нэмэх.

## 4. Системийг туршиж үзэх

1. `yarn dev` ажиллуулах
2. `http://localhost:3000/admin` руу орох
3. `/admin/login` руу redirect хийгдэнэ
4. **Google** товч дарж нэвтрэх
5. Амжилттай нэвтэрсэн бол `/admin` руу орно

## Админ Удирдлага

### Шинэ админ нэмэх:

1. Sidebar дээрх **Админ удирдлага** дарах (эсвэл `/admin/users` руу очих)
2. Gmail хаягийг оруулах
3. **Админ нэмэх** дарах
4. Тухайн хүн Google-р нэвтэрч чадна

### Админ устгах:

1. **Админ удирдлага** хуудсанд очих
2. Устгах админы хажууд байгаа휴지통 товч дарах
3. Баталгаажуулах

**Анхааруулга:** Өөрийгөө устгаж болохгүй!

## Системийн Онцлог

✅ Google OAuth нэвтрэх
✅ Имэйл whitelist систем
✅ Silk анимейшн background бүхий нэвтрэх хуудас
✅ Хамгаалагдсан admin routes
✅ Админ удирдлагын интерфейс
✅ Гарах функц
✅ Sidebar дээр хэрэглэгчийн мэдээлэл харуулах

## Алдаа засах

### "Таны имэйл админ жагсаалтанд байхгүй байна"

Шалтгаан:
- Таны Gmail хаяг `admin_users` хүснэгтэнд байхгүй байна
- Имэйл хаяг таарахгүй байна (том жижиг үсэг шалгаарай)

Засах:
```sql
SELECT * FROM admin_users WHERE email = 'таны-gmail@gmail.com';
```
Хэрэв олдохгүй бол:
```sql
INSERT INTO admin_users (email) VALUES ('таны-gmail@gmail.com');
```

### Google OAuth redirect алдаа

Шалтгаан:
- Google Cloud Console дээрх redirect URI буруу байна

Засах:
- Redirect URI зөв эсэхийг шалгаарай: `https://amhauqdhanbnszgajqxv.supabase.co/auth/v1/callback`
- JavaScript origins: `http://localhost:3000` болон таны production домайн

## Файлын бүтэц

### Шинэ файлууд:
- `/components/ui/Silk.tsx` - Анимейшн background
- `/lib/auth.ts` - Нэвтрэх функцүүд
- `/components/admin/AuthGuard.tsx` - Route хамгаалалт
- `/app/admin/login/page.tsx` - Нэвтрэх хуудас
- `/app/admin/auth/callback/page.tsx` - OAuth callback
- `/app/admin/users/page.tsx` - Админ удирдлага
- `supabase_migration_admin_users.sql` - Database migration

### Өөрчлөгдсөн файлууд:
- `/lib/supabase.ts` - AdminUser interface нэмэгдсэн
- `/app/admin/layout.tsx` - AuthGuard, logout, user info нэмэгдсэн

## Дараагийн алхамууд

1. ✅ SQL migration ажиллуулах
2. ✅ Google OAuth credentials тохируулах
3. ✅ Өөрийн имэйлийг admin_users-т нэмэх
4. ✅ Систем туршиж үзэх
5. ✅ Бусад админуудыг нэмэх

Амжилт хүсье! 🎉
