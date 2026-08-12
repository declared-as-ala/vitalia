import { PrismaClient, Role, ClientStatus, DossierStage, DegreeLevel, PaymentMethod, ProgramStatus, ReviewStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ViaItalia MongoDB Atlas Database Seeding...');

  // 1. Clean existing records
  await prisma.review.deleteMany();
  await prisma.receipt.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.document.deleteMany();
  await prisma.dossier.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.programIntake.deleteMany();
  await prisma.program.deleteMany();
  await prisma.university.deleteMany();
  await prisma.scrapeSource.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 2. Create Users
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@viaitalia.tn',
      passwordHash,
      firstName: 'Marco',
      lastName: 'Rossi',
      role: Role.SUPER_ADMIN,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@viaitalia.tn',
      passwordHash,
      firstName: 'Sofia',
      lastName: 'Bianchi',
      role: Role.ADMIN,
    },
  });

  const agent = await prisma.user.create({
    data: {
      email: 'agent@viaitalia.tn',
      passwordHash,
      firstName: 'Matteo',
      lastName: 'Ferrari',
      role: Role.AGENT,
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      email: 'client@viaitalia.tn',
      passwordHash,
      firstName: 'Ahmed',
      lastName: 'Ben Ali',
      role: Role.CLIENT,
    },
  });

  console.log('✅ Base Users Created.');

  // 3. Create Client Profile
  const clientProfile = await prisma.clientProfile.create({
    data: {
      userId: clientUser.id,
      clientNumber: 'CL-2026-0001',
      phone: '+216 20 123 456',
      nationality: 'Tunisian',
      countryOfResidence: 'Tunisia',
      status: ClientStatus.ACTIVE,
      assignedAgentId: agent.id,
    },
  });

  // 4. Create Client Dossier
  const dossier = await prisma.dossier.create({
    data: {
      clientId: clientProfile.id,
      studyDomain: 'Computer Science',
      desiredDegree: DegreeLevel.MASTER,
      academicYear: '2026/2027',
      preferredCities: ['Milano', 'Bologna', 'Torino'],
      preferredUniversities: ['Politecnico di Milano', 'Università di Bologna'],
      stage: DossierStage.UNIVERSITY_APPLICATION,
      notes: 'High GPA candidate seeking English-taught Computer Science & AI master programs.',
      assignedAgentId: agent.id,
    },
  });

  // 5. Create Payment & Receipt
  const payment = await prisma.payment.create({
    data: {
      clientId: clientProfile.id,
      amount: 450.0,
      currency: 'EUR',
      paymentMethod: PaymentMethod.BANK_TRANSFER,
      paymentDate: new Date('2026-08-01'),
      notes: 'First installment for university application guidance package.',
      createdById: admin.id,
    },
  });

  const receipt = await prisma.receipt.create({
    data: {
      receiptNumber: 'REC-2026-0001',
      clientId: clientProfile.id,
      paymentId: payment.id,
      amount: 450.0,
      currency: 'EUR',
      paymentMethod: PaymentMethod.BANK_TRANSFER,
      paymentDate: new Date('2026-08-01'),
      createdById: admin.id,
    },
  });

  console.log(`✅ Client Profile & Receipt Created: ${receipt.receiptNumber}`);

  // 6. Create Italian Universities & Programs
  const polimi = await prisma.university.create({
    data: {
      name: 'Politecnico di Milano',
      slug: 'politecnico-di-milano',
      city: 'Milano',
      region: 'Lombardia',
      country: 'IT',
      website: 'https://www.polimi.it',
    },
  });

  const unibo = await prisma.university.create({
    data: {
      name: 'Università di Bologna',
      slug: 'universita-di-bologna',
      city: 'Bologna',
      region: 'Emilia-Romagna',
      country: 'IT',
      website: 'https://www.unibo.it',
    },
  });

  const polito = await prisma.university.create({
    data: {
      name: 'Politecnico di Torino',
      slug: 'politecnico-di-torino',
      city: 'Torino',
      region: 'Piemonte',
      country: 'IT',
      website: 'https://www.polito.it',
    },
  });

  const program1 = await prisma.program.create({
    data: {
      universityId: polimi.id,
      name: 'Computer Science and Engineering',
      slug: 'computer-science-and-engineering',
      degreeLevel: DegreeLevel.MASTER,
      studyDomain: 'Computer Science',
      language: 'English',
    },
  });

  await prisma.programIntake.create({
    data: {
      programId: program1.id,
      academicYear: '2026/2027',
      openingDate: new Date('2026-01-15'),
      closingDate: new Date('2026-03-02'),
      applicationFee: 50.0,
      tuitionFee: 3900.0,
      status: ProgramStatus.OPEN,
      sourceUrl: 'https://www.polimi.it/en/international-prospective-students',
    },
  });

  const program2 = await prisma.program.create({
    data: {
      universityId: unibo.id,
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      degreeLevel: DegreeLevel.MASTER,
      studyDomain: 'Computer Science',
      language: 'English',
    },
  });

  await prisma.programIntake.create({
    data: {
      programId: program2.id,
      academicYear: '2026/2027',
      openingDate: new Date('2026-02-01'),
      closingDate: new Date('2026-04-30'),
      applicationFee: 30.0,
      tuitionFee: 3000.0,
      status: ProgramStatus.OPEN,
      sourceUrl: 'https://www.unibo.it/en/teaching/degree-programmes',
    },
  });

  console.log('✅ Italian Universities & Programs Seeded.');

  // 7. Seed Reviews
  await prisma.review.createMany({
    data: [
      {
        authorName: 'Yassine Khedher',
        rating: 5,
        title: 'Outstanding Guidance for Polimi Admission!',
        comment: 'ViaItalia supported me through every step of my MSc application in Milan. Their deadline tracking and dossier preparation are second to none.',
        status: ReviewStatus.PUBLISHED,
        isFeatured: true,
      },
      {
        authorName: 'Sara Mansour',
        rating: 5,
        title: 'Stress-free Visa & University Process',
        comment: 'I received my admission at Università di Bologna thanks to the amazing agents at ViaItalia. Always transparent with payments and instant receipts.',
        status: ReviewStatus.PUBLISHED,
        isFeatured: true,
      },
      {
        authorName: 'Karem Dridi',
        rating: 4,
        title: 'Professional and Reliable Agency',
        comment: 'Very helpful team for Italian university procedures. Clear receipts and great communication throughout.',
        status: ReviewStatus.PUBLISHED,
        isFeatured: false,
      },
    ],
  });

  console.log('✅ Reviews Seeded.');
  console.log('🎉 ViaItalia MongoDB Atlas Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
