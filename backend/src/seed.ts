import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  entities: ['src/entities/*.entity.ts'],
});

async function seed() {
  await AppDataSource.initialize();

  // Kategorileri ekle
  const categoryResult = await AppDataSource.query('SELECT COUNT(*) as count FROM categories');
  if (categoryResult[0].count === 0) {
    console.log('Kategoriler ekleniyor...');
    await AppDataSource.query(`
      INSERT INTO categories (name) VALUES 
      ('Çorbalar'),
      ('Ana Yemekler'),
      ('Tatlılar'),
      ('Salatalar'),
      ('Atıştırmalıklar')
    `);
    console.log('✓ Kategoriler eklendi!');
  }

  // Malzemeleri ekle
  const ingredientResult = await AppDataSource.query('SELECT COUNT(*) as count FROM ingredients');
  if (ingredientResult[0].count === 0) {
    console.log('Malzemeler ekleniyor...');
    await AppDataSource.query(`
      INSERT INTO ingredients (name) VALUES 
      ('Un'),
      ('Yumurta'),
      ('Süt'),
      ('Domates'),
      ('Soğan'),
      ('Sarımsak'),
      ('Biber'),
      ('Tuz'),
      ('Karabiber'),
      ('Zeytinyağı'),
      ('Tereyağı'),
      ('Şeker'),
      ('Patates'),
      ('Havuç'),
      ('Tavuk'),
      ('Kıyma'),
      ('Makarna'),
      ('Pirinç')
    `);
    console.log('✓ Malzemeler eklendi!');
  }

  // Admin kullanıcısını ekle
  const adminResult = await AppDataSource.query(`SELECT COUNT(*) as count FROM users WHERE email = 'admin@admin.com'`);
  if (adminResult[0].count === 0) {
    console.log('Admin kullanıcısı oluşturuluyor...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await AppDataSource.query(`
      INSERT INTO users (email, password, name, role) VALUES 
      ('admin@admin.com', '${hashedPassword}', 'Admin', 'admin')
    `);
    console.log('✓ Admin kullanıcısı oluşturuldu!');
    console.log('  Email: admin@admin.com');
    console.log('  Şifre: admin123');
  }

  await AppDataSource.destroy();
  console.log('\n✓ Tüm veriler hazır!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Hata:', error);
  process.exit(1);
});