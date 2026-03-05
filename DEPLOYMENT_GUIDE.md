# 🥊 WBC Muay Thai Egypt — دليل النشر الكامل

## الوضع الحالي: ما تم بناؤه

```
✅ قاعدة البيانات (Supabase)      — مخطط كامل مع RLS
✅ لوحة التحكم                    — إحصاءات فورية
✅ إدارة المقاتلين                — قائمة + تسجيل + بحث
✅ البطولات والفعاليات            — إضافة + متابعة
✅ الصالات المعتمدة               — بطاقات مع تنبيه التجديد
✅ التصنيفات (عام)                — صفحة عامة بلا تسجيل دخول
✅ تسجيل الدخول                  — مع نظام صلاحيات متعدد المستويات
```

---

## 🚀 خطوات النشر (30 دقيقة)

### الخطوة 1: إنشاء مشروع Supabase (مجاني)

1. اذهب إلى **https://supabase.com**
2. سجّل حساب جديد
3. اضغط **"New Project"**
4. اختر اسم المشروع: `wbc-muay-thai-egypt`
5. اختر كلمة سر قوية للـ Database
6. اختر المنطقة: **Europe (Frankfurt)** أو **Asia (Singapore)** ← الأقرب لمصر
7. انتظر ~2 دقيقة حتى ينتهي الإنشاء

### الخطوة 2: تشغيل مخطط قاعدة البيانات

1. في Supabase Dashboard، اذهب إلى **SQL Editor**
2. افتح الملف: `supabase_schema.sql`
3. انسخ كل المحتوى والصقه في SQL Editor
4. اضغط **"Run"**
5. يجب أن ترى: "Success. No rows returned"

### الخطوة 3: الحصول على مفاتيح API

1. في Supabase، اذهب إلى **Settings → API**
2. انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (سري جداً!)

### الخطوة 4: إنشاء حساب المشرف الأول

1. في Supabase، اذهب إلى **Authentication → Users**
2. اضغط **"Invite user"** أو **"Add user"**
3. أدخل بريدك الإلكتروني وكلمة سر
4. بعد الإنشاء، اذهب إلى **SQL Editor** وشغّل:

```sql
-- استبدل YOUR_USER_ID بالـ id الظاهر في قائمة المستخدمين
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'YOUR_USER_ID',
  'your@email.com',
  'اسمك الكامل',
  'super_admin'
);
```

### الخطوة 5: رفع الكود على GitHub

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - WBC Muay Thai Egypt"

# أنشئ repo جديد على github.com ثم:
git remote add origin https://github.com/USERNAME/wbc-egypt.git
git push -u origin main
```

### الخطوة 6: النشر على Vercel (مجاني)

1. اذهب إلى **https://vercel.com**
2. سجّل دخول بحساب GitHub
3. اضغط **"New Project"**
4. اختر الـ repository: `wbc-egypt`
5. في **Environment Variables**، أضف:

```
NEXT_PUBLIC_SUPABASE_URL     = https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY     = eyJhbGci...
```

6. اضغط **"Deploy"**
7. بعد ~2 دقيقة، الموقع جاهز على:
   `https://wbc-egypt.vercel.app`

---

## 🔐 إضافة مستخدمين جدد

### إضافة مدير (فريقك في مصر):
```sql
-- بعد أن يسجل في Supabase Auth
UPDATE profiles SET role = 'admin' WHERE email = 'team@example.com';
```

### إضافة مقاتل:
```sql
UPDATE profiles SET role = 'fighter' WHERE email = 'fighter@example.com';
```

### الصلاحيات:
| الدور | ما يمكنه |
|-------|----------|
| `super_admin` | كل شيء |
| `admin` | إدارة المقاتلين والبطولات والصالات |
| `fighter` | عرض ملفه الشخصي |
| `gym` | عرض بيانات صالته |
| `public` | التصنيفات فقط (بلا تسجيل) |

---

## 💰 التكاليف الشهرية

| الخدمة | التكلفة |
|--------|---------|
| Supabase (Free tier) | مجاني حتى 500MB |
| Vercel (Free tier) | مجاني |
| Domain (اختياري) | ~10$/سنة |
| **المجموع** | **0$/شهر** في البداية |

عند النمو (أكثر من 500MB أو 50,000 مستخدم):
- Supabase Pro: $25/شهر
- Vercel Pro: $20/شهر

---

## 🌐 اسم النطاق المقترح

```
wbcmuaythai-egypt.com
wbc-egypt.org
muaythai-egypt.com
```

شراء من: **Namecheap.com** (~10$/سنة)
ثم ربطه بـ Vercel من: Settings → Domains

---

## 📱 التطبيق على الموبايل

الموقع responsive ويعمل على الموبايل بشكل كامل.
لو أردت تطبيق iOS/Android حقيقي لاحقاً، يمكن تحويله بـ **Capacitor** بدون إعادة كتابة الكود.

---

## 🔧 تطوير محلي (للاختبار)

```bash
# في مجلد المشروع
cp .env.example .env.local
# عدّل .env.local بمفاتيح Supabase

npm install
npm run dev
# الموقع على: http://localhost:3000
```

---

## 📞 المرحلة القادمة

بعد نشر المرحلة الأولى، يمكن إضافة:
- [ ] صفحة مفصلة لكل مقاتل
- [ ] نظام نتائج المباريات (شجرة البطولة)
- [ ] إدارة المدربين والحكام
- [ ] إدارة التراخيص مع تنبيهات بريد إلكتروني
- [ ] التقارير والإحصاءات المتقدمة
- [ ] صفحة عامة للجمهور (أخبار + نتائج)
- [ ] تكامل مع WBC الدولي (تصدير تقارير PDF)

---

بالتوفيق! 🥊🇪🇬
