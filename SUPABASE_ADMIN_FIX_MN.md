# Supabase Admin Users Устгах Асуудлыг Засах Заавар

## Асуудал
Админ хэрэглэгчийг устгахад "амжилттай устгагдлаа" гэж toast гарч байгаа боловч database дээрээс устахгүй байна.

## Шалтгаан
Row Level Security (RLS) policy-н асуудал байж магадгүй.

## Шийдэл

### 1-р алхам: Supabase Dashboard руу орно уу
1. https://supabase.com руу очоод нэвтэрнэ үү
2. Өөрийн project-г сонгоно уу
3. Зүүн талын menu-с **SQL Editor** гэдгийг сонгоно уу

### 2-р алхам: Policy-г шинэчлэх
1. SQL Editor дээр **New query** дарна уу
2. `supabase_fix_admin_users_policy.sql` файлын бүх агуулгыг copy хийнэ үү
3. SQL Editor дээр paste хийнэ үү
4. **Run** товч дээр дарж ажиллуулна уу

### 3-р алхам: Үр дүн шалгах
1. Admin Users хуудас руу очоод дахин турших
2. Админ устгах үйлдлийг дахин туршина уу
3. Хэрэв ажиллахгүй бол доорх алхмыг үргэлжлүүлнэ үү

---

## Хэрэв дээрх шийдэл ажиллахгүй бол

Supabase Dashboard дээр дараах шалгалт хийнэ үү:

### Table Permissions шалгах
1. **Table Editor** руу очно уу
2. `admin_users` table-г олно уу
3. Баруун дээд буланд байгаа **⚙️ (Settings)** дээр дарна уу
4. **Policies** хэсэг рүү очно уу
5. Дараах policies байгаа эсэхийг шалгана:
   - "Enable read access for all users" (SELECT)
   - "Enable insert access for all users" (INSERT)
   - "Enable update access for all users" (UPDATE)
   - "Enable delete access for all users" (DELETE)

### RLS идэвхтэй эсэхийг шалгах
1. Table Editor дээр `admin_users` table
2. RLS (Row Level Security) ON байгаа эсэхийг шалгана
3. "RLS is enabled" гэсэн мэдээлэл харагдах ёстой

---

## Өөр шийдэл: RLS-г түр хугацаагаар унтраах (анхааруулга: аюулгүй биш)

**Зөвхөн тест хийхийн тулд** дараах SQL-г ажиллуулж болно:

```sql
-- Анхааруулга: Энэ нь аюулгүй бус, зөвхөн тест хийхэд ашиглана
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
```

Хэрэв энэ нь ажилласнаа доорх SQL-аар RLS-г дахин асаана:

```sql
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

---

## Техникийн дэмжлэг

Хэрэв ямар нэг асуудал гарвал:
1. Browser-н Console-г нээнэ үү (F12)
2. Network tab руу очно уу
3. Устгах товч дээр дарна
4. Request/Response-г шалгаад надад илгээнэ үү

---

## Түгээмэл гарч байгаа алдаа

### "new row violates row-level security policy"
- Policy-н USING clause буруу байна гэсэн үг
- Дээрх `supabase_fix_admin_users_policy.sql`-г дахин ажиллуулна уу

### "permission denied for table admin_users"
- Supabase anon key-н эрх хүрэлцэхгүй байна
- Service role key ашиглах шаардлагатай (гэхдээ энэ нь frontend дээр хэрэглэхгүй!)

### "duplicate key value violates unique constraint"
- Өөр асуудал - email давхардсан байна
- Энэ нь устгах үйлдэлтэй холбоогүй
