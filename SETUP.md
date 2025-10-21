# UzAutoMotors - Tezkor O'rnatish Qo'llanmasi

## 📋 Talablar

- Node.js (v16 yoki yuqori)
- MongoDB (v4.4 yoki yuqori)
- Git

## ⚙️ Qadam-baqadam o'rnatish

### 1. MongoDB'ni ishga tushirish

**Windows:**
```bash
# MongoDB service'ini boshlash
net start MongoDB
```

Yoki MongoDB Compass dasturini oching.

### 2. Backend'ni sozlash

```bash
# Loyiha papkasiga kirish
cd "e:\Najot talim\Imtihon\Imtihon 5-oy\UzAutoMotors"

# Dependencies o'rnatish
npm install

# .env faylini yaratish
copy .env.example .env
```

### 3. .env faylini to'ldirish

`.env` faylini oching va quyidagi ma'lumotlarni kiriting:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/uzautomotors

# JWT keys (ixtiyoriy kuchli kalitlar)
ACCESS_SECRET_KEY=mysecretkey123456
REFRESH_SECRET_KEY=myrefreshkey123456
RESET_SECRET_KEY=myresetkey123456

# Gmail App Password (https://myaccount.google.com/apppasswords)
APP_PASS=your_gmail_app_password_here
```

**Gmail App Password olish:**
1. Google hisobingizga kiring
2. https://myaccount.google.com/apppasswords ga o'ting
3. Ilovangiz uchun parol yarating
4. 16 belgili kodni `.env` fayliga qo'shing

### 4. Frontend'ni sozlash

```bash
# Frontend papkasiga o'tish
cd client

# Dependencies o'rnatish
npm install

# Asosiy papkaga qaytish
cd ..
```

### 5. Ishga tushirish

**Birinchi Terminal (Backend):**
```bash
npm run dev
```

Natija: `Server 3000 portda ishga tushdi! 🚀`

**Ikkinchi Terminal (Frontend):**
```bash
cd client
npm run dev
```

Natija: `http://localhost:5173`

### 6. Brauzerda ochish

Brauzerni oching va quyidagi manzilga o'ting:
```
http://localhost:5173
```

## 🔐 Admin yaratish

1. Avval oddiy foydalanuvchi sifatida ro'yxatdan o'ting
2. Email'ingizni tasdiqlang (OTP kodi bilan)
3. MongoDB Compass'da yoki terminal'da:

```javascript
// MongoDB shell
use uzautomotors

db.users.updateOne(
  { email: "sizning@email.uz" },
  { $set: { role: "admin" } }
)
```

4. Qaytadan kirish qiling
5. Admin panel: http://localhost:5173/admin

## ✅ Tekshirish

- [ ] Backend ishlamoqda (`http://localhost:3000`)
- [ ] Frontend ishlamoqda (`http://localhost:5173`)
- [ ] MongoDB ulanish ishlayapti
- [ ] Ro'yxatdan o'tish va OTP ishlayapti
- [ ] Admin panel'ga kirish mumkin

## 🐛 Muammolarni hal qilish

### 1. MongoDB ulanish xatosi
```
MongoServerError: connect ECONNREFUSED
```
**Yechim:** MongoDB service ishlamayapti. Uni ishga tushiring:
```bash
net start MongoDB
```

### 2. Port band xatosi
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Yechim:** Port band. Boshqa port ishlatish yoki eski jarayonni to'xtatish:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### 3. npm install xatosi
**Yechim:** npm cache'ni tozalash:
```bash
npm cache clean --force
npm install
```

### 4. Email yuborilmayapti
**Yechim:** 
- Gmail App Password to'g'ri kiritilganini tekshiring
- 2-bosqichli tasdiqlash yoqilganligini tekshiring
- `.env` faylida `APP_PASS` to'g'riligini tekshiring

## 📞 Yordam

Agar muammo hal bo'lmasa:
1. README.md faylini o'qing
2. Xatolik xabarini diqqat bilan o'qing
3. Google'da qidiring

## 🎉 Tayyor!

Endi siz UzAutoMotors platformasini ishlatishingiz mumkin!

- Asosiy sahifa: http://localhost:5173
- Admin panel: http://localhost:5173/admin
- API: http://localhost:3000/api
