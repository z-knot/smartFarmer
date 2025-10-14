import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.sensorReading.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.fieldCrop.deleteMany();
  await prisma.field.deleteMany();
  await prisma.crop.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@agrivision.com',
      fullName: 'System Administrator',
      role: 'admin',
      password: hashedPassword,
    },
  });

  console.log('👑 Created admin user:', adminUser.email);

  // Create sample agronomist user
  const agronomistPassword = await bcrypt.hash('agro123', 12);
  const agronomistUser = await prisma.user.create({
    data: {
      email: 'agronomist@agrivision.com',
      fullName: 'Dr. Sarah Johnson',
      role: 'agronomist',
      password: agronomistPassword,
    },
  });

  console.log('🔬 Created agronomist user:', agronomistUser.email);

  // Create sample farmer user
  const farmerPassword = await bcrypt.hash('farmer123', 12);
  const farmerUser = await prisma.user.create({
    data: {
      email: 'farmer@agrivision.com',
      fullName: 'John Doe',
      role: 'farmer',
      password: farmerPassword,
    },
  });

  console.log('🚜 Created farmer user:', farmerUser.email);

  // Create sample crops
  const crops = await Promise.all([
    prisma.crop.create({
      data: {
        name: 'Corn',
        variety: 'Sweet Corn',
        growingSeasonDays: 120,
      },
    }),
    prisma.crop.create({
      data: {
        name: 'Soybeans',
        variety: 'Williams 82',
        growingSeasonDays: 100,
      },
    }),
    prisma.crop.create({
      data: {
        name: 'Wheat',
        variety: 'Hard Red Winter',
        growingSeasonDays: 240,
      },
    }),
  ]);

  console.log('🌾 Created crops:', crops.map(c => c.name));

  // Create sample fields for the farmer
  const fields = await Promise.all([
    prisma.field.create({
      data: {
        name: 'North Field',
        area: 15.5,
        soilType: 'Clay Loam',
        userId: farmerUser.id,
      },
    }),
    prisma.field.create({
      data: {
        name: 'South Field',
        area: 12.3,
        soilType: 'Sandy Loam',
        userId: farmerUser.id,
      },
    }),
    prisma.field.create({
      data: {
        name: 'East Field',
        area: 8.7,
        soilType: 'Loam',
        userId: farmerUser.id,
      },
    }),
  ]);

  console.log('🗺️ Created fields:', fields.map(f => f.name));

  // Create field-crop relationships
  await Promise.all([
    prisma.fieldCrop.create({
      data: {
        fieldId: fields[0].id,
        cropId: crops[0].id,
        plantingDate: new Date('2024-03-15'),
        expectedHarvestDate: new Date('2024-08-15'),
        status: 'growing',
      },
    }),
    prisma.fieldCrop.create({
      data: {
        fieldId: fields[1].id,
        cropId: crops[1].id,
        plantingDate: new Date('2024-04-01'),
        expectedHarvestDate: new Date('2024-09-15'),
        status: 'growing',
      },
    }),
    prisma.fieldCrop.create({
      data: {
        fieldId: fields[2].id,
        cropId: crops[2].id,
        plantingDate: new Date('2024-03-20'),
        expectedHarvestDate: new Date('2024-07-20'),
        status: 'growing',
      },
    }),
  ]);

  console.log('🌱 Created field-crop relationships');

  // Create sample alerts
  await Promise.all([
    prisma.alert.create({
      data: {
        title: 'Low Soil Moisture',
        message: 'North field soil moisture below 30%. Consider irrigation.',
        type: 'warning',
        fieldId: fields[0].id,
        status: 'active',
      },
    }),
    prisma.alert.create({
      data: {
        title: 'Pest Detection',
        message: 'Possible aphid infestation detected in South field.',
        type: 'critical',
        fieldId: fields[1].id,
        status: 'active',
      },
    }),
    prisma.alert.create({
      data: {
        title: 'Weather Advisory',
        message: 'Frost warning for tonight. Protect sensitive crops.',
        type: 'warning',
        fieldId: fields[2].id,
        status: 'active',
      },
    }),
  ]);

  console.log('🚨 Created sample alerts');

  // Create sample sensor readings
  const sensorTypes = ['temperature', 'humidity', 'soilMoisture', 'soilPH'];
  const readings = [];

  for (const field of fields) {
    for (const sensorType of sensorTypes) {
      // Create 24 hours of data (hourly readings)
      for (let i = 0; i < 24; i++) {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - i);

        let value: number;
        let unit: string;

        switch (sensorType) {
          case 'temperature':
            value = 20 + Math.random() * 10; // 20-30°C
            unit = '°C';
            break;
          case 'humidity':
            value = 50 + Math.random() * 30; // 50-80%
            unit = '%';
            break;
          case 'soilMoisture':
            value = 30 + Math.random() * 20; // 30-50%
            unit = '%';
            break;
          case 'soilPH':
            value = 6.0 + Math.random() * 1.5; // 6.0-7.5
            unit = 'pH';
            break;
          default:
            value = 0;
            unit = '';
        }

        readings.push({
          fieldId: field.id,
          sensorType,
          value,
          unit,
          timestamp,
        });
      }
    }
  }

  await prisma.sensorReading.createMany({
    data: readings,
  });

  console.log('📊 Created sensor readings:', readings.length);

  console.log('✅ Database seeded successfully!');
  console.log('\n🔑 Login credentials:');
  console.log('👑 Admin: admin@agrivision.com / admin123');
  console.log('🔬 Agronomist: agronomist@agrivision.com / agro123');
  console.log('🚜 Farmer: farmer@agrivision.com / farmer123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });