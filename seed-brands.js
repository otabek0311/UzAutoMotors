const mongoose = require('mongoose');
require('dotenv').config();

const brandSchema = new mongoose.Schema({
  name: String,
  logo: String,
  description: String,
  country: String,
  isActive: Boolean,
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);

const brands = [
  {
    name: 'Chevrolet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png',
    description: 'Amerikalik mashhur avtomobil ishlab chiqaruvchisi',
    country: 'AQSh',
    isActive: true,
  },
  {
    name: 'Mercedes-Benz',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png',
    description: 'Germaniyaning hashamatli avtomobil brendi',
    country: 'Germaniya',
    isActive: true,
  },
  {
    name: 'BMW',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png',
    description: 'Bavariya motor zavodlari',
    country: 'Germaniya',
    isActive: true,
  },
  {
    name: 'Toyota',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/200px-Toyota.svg.png',
    description: 'Dunyodagi eng katta avtomobil ishlab chiqaruvchi',
    country: 'Yaponiya',
    isActive: true,
  },
  {
    name: 'Honda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/200px-Honda_Logo.svg.png',
    description: 'Yapon avtomobil va mototsikl ishlab chiqaruvchisi',
    country: 'Yaponiya',
    isActive: true,
  },
  {
    name: 'Ford',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/200px-Ford_logo_flat.svg.png',
    description: 'Amerikalik avtomobil giganti',
    country: 'AQSh',
    isActive: true,
  },
  {
    name: 'Volkswagen',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png',
    description: 'Germaniyaning eng katta avtomobil ishlab chiqaruvchisi',
    country: 'Germaniya',
    isActive: true,
  },
  {
    name: 'Hyundai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png',
    description: 'Janubiy Koreya avtomobil brendi',
    country: 'Janubiy Koreya',
    isActive: true,
  },
  {
    name: 'Kia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/KIA_%28logo%29.svg/200px-KIA_%28logo%29.svg.png',
    description: 'Zamonaviy Koreya avtomobillari',
    country: 'Janubiy Koreya',
    isActive: true,
  },
  {
    name: 'Audi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Audi_logo_detail.svg/200px-Audi_logo_detail.svg.png',
    description: 'Premium Germaniya avtomobillari',
    country: 'Germaniya',
    isActive: true,
  },
  {
    name: 'Nissan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/200px-Nissan_logo.svg.png',
    description: 'Yapon avtomobil ishlab chiqaruvchisi',
    country: 'Yaponiya',
    isActive: true,
  },
  {
    name: 'Mazda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Mazda_logo_%282018%29.svg/200px-Mazda_logo_%282018%29.svg.png',
    description: 'Sport Yapon avtomobillari',
    country: 'Yaponiya',
    isActive: true,
  },
  {
    name: 'Lexus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Lexus_division_emblem.svg/200px-Lexus_division_emblem.svg.png',
    description: 'Toyota ning hashamatli brendi',
    country: 'Yaponiya',
    isActive: true,
  },
  {
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/200px-Tesla_Motors.svg.png',
    description: 'Elektr avtomobillari ishlab chiqaruvchisi',
    country: 'AQSh',
    isActive: true,
  },
  {
    name: 'Porsche',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Porsche_logo.svg/200px-Porsche_logo.svg.png',
    description: 'Germaniya sport avtomobillari',
    country: 'Germaniya',
    isActive: true,
  },
];

async function seedBrands() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB ga ulandi!');

    await Brand.deleteMany({});
    console.log('🗑️  Eski markalar o\'chirildi');

    await Brand.insertMany(brands);
    console.log(`✅ ${brands.length} ta marka muvaffaqiyatli qo'shildi!`);

    mongoose.connection.close();
    console.log('✅ Tugadi!');
  } catch (error) {
    console.error('❌ Xatolik:', error);
    process.exit(1);
  }
}

seedBrands();
