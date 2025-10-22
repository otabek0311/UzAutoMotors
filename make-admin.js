const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,
  phoneNumber: String,
  isVerified: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB ga ulandi!\n');

    const users = await User.find({});
    
    if (users.length === 0) {
      console.log('❌ Hech qanday user topilmadi!');
      console.log('Avval ro\'yxatdan o\'ting: http://localhost:5173/register\n');
      mongoose.connection.close();
      return;
    }

    console.log('📋 Mavjud userlar:\n');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.fullName} (${user.email})`);
      console.log(`   Role: ${user.role} | Tasdiqlangan: ${user.isVerified ? '✅' : '❌'}\n`);
    });

    const firstUser = users[0];
    
    if (firstUser.role === 'admin') {
      console.log(`✅ ${firstUser.email} allaqachon admin!`);
    } else {
      await User.updateOne(
        { _id: firstUser._id },
        { $set: { role: 'admin' } }
      );
      console.log(`✅ ${firstUser.email} admin qilindi!`);
    }

    mongoose.connection.close();
    console.log('\n✅ Tugadi! Endi login qiling va admin panelga kiring.');
  } catch (error) {
    console.error('❌ Xatolik:', error);
    process.exit(1);
  }
}

makeAdmin();
