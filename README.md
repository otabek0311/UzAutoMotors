# UzAutoMotors - Avtomobil Savdo Platformasi

O'zbekistonning zamonaviy avtomobil savdo platformasi. React va Node.js yordamida qurilgan to'liq funksional veb-ilova.

## 📋 Xususiyatlar

### Foydalanuvchilar uchun:
- ✅ Avtomobillar katalogi
- ✅ Kengaytirilgan qidiruv va filtrlash
- ✅ Avtomobil tafsilotlari (tashqi/ichki rasmlar)
- ✅ Mashhur va yangi avtomobillar
- ✅ Ro'yxatdan o'tish va kirish
- ✅ Email tasdiqlash (OTP)

### Admin panel:
- ✅ Dashboard (statistika)
- ✅ Markalarni boshqarish (CRUD)
- ✅ Avtomobillarni boshqarish (CRUD)
- ✅ Rasm yuklash
- ✅ Responsive dizayn

## 🛠 Texnologiyalar

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Bcrypt (Password hashing)
- Multer (File upload)
- Nodemailer (Email sending)

### Frontend:
- React 18
- React Router v6
- Axios
- TailwindCSS
- Lucide Icons
- Vite

## 📦 O'rnatish

### 1. Repository'ni klonlash
```bash
git clone <repository-url>
cd UzAutoMotors
```

### 2. Backend o'rnatish
```bash
# Dependencies o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env
```

`.env` faylini sozlang:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/uzautomotors
ACCESS_SECRET_KEY=your_access_secret_key
REFRESH_SECRET_KEY=your_refresh_secret_key
RESET_SECRET_KEY=your_reset_secret_key
APP_PASS=your_gmail_app_password
```

### 3. Frontend o'rnatish
```bash
cd client
npm install
```

### 4. Ishga tushirish

**Backend (Terminal 1):**
```bash
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Backend: `http://localhost:3000`  
Frontend: `http://localhost:5173`

## 📁 Loyiha strukturasi

```
UzAutoMotors/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin pages
│   │   ├── layouts/        # Layout components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── config/                 # Database config
├── controller/             # Route controllers
├── error/                  # Error handlers
├── middleware/             # Express middlewares
├── router/                 # API routes
├── schema/                 # Mongoose models
├── utils/                  # Utility functions
├── validator/              # Input validators
├── upload/                 # Uploaded files
├── index.js                # Server entry point
└── package.json
```

## 🔐 Admin panel kirish

Admin hisobini yaratish uchun MongoDB da qo'lda role'ni o'zgartiring:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📝 API Endpoints

### Auth
- POST `/api/auth/register` - Ro'yxatdan o'tish
- POST `/api/auth/verify-otp` - OTP tasdiqlash
- POST `/api/auth/login` - Kirish
- GET `/api/auth/me` - Joriy foydalanuvchi

### Brands
- GET `/api/brands` - Barcha markalar
- GET `/api/brands/:id` - Bitta marka
- POST `/api/brands` - Marka qo'shish (Admin)
- PUT `/api/brands/:id` - Marka yangilash (Admin)
- DELETE `/api/brands/:id` - Marka o'chirish (Admin)

### Cars
- GET `/api/cars` - Barcha avtomobillar
- GET `/api/cars/popular` - Mashhur avtomobillar
- GET `/api/cars/latest` - Yangi avtomobillar
- GET `/api/cars/:id` - Bitta avtomobil
- POST `/api/cars` - Avtomobil qo'shish (Admin)
- PUT `/api/cars/:id` - Avtomobil yangilash (Admin)
- DELETE `/api/cars/:id` - Avtomobil o'chirish (Admin)

## 🎨 Dizayn

Loyiha zamonaviy va responsive dizaynga ega:
- TailwindCSS utility classes
- Lucide Icons
- Clean va minimalist UI
- Mobile-first approach

## 🚀 Production uchun build

### Backend
```bash
# PM2 bilan ishga tushirish
npm install -g pm2
pm2 start index.js --name uzautomotors
```

### Frontend
```bash
cd client
npm run build
# build papkasini hosting ga deploy qiling
```

## 📄 License

MIT License

## 👨‍💻 Muallif

UzAutoMotors Jamoasi
