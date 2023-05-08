import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      username: 'alice',
    },
    update: {},
    create: {
      username: 'alice',
      profile: {
        create: {
          alias: 'alice',
          email_address: 'alice@prisma.io',
          password: 'callmealice',
          avatar_url: 'https://randomuser.me/api/portraits/women/18.jpg',
          description: 'Hi I am Alice',
          location: 'Hungary',
        },
      },
      preference: {
        create: {},
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: {
      username: 'bob',
    },
    update: {},
    create: {
      username: 'bob',
      profile: {
        create: {
          alias: 'bob',
          email_address: 'bob@prisma.io',
          password: 'callmebob',
          avatar_url: 'https://randomuser.me/api/portraits/men/18.jpg',
          description: 'Hi I am Bob',
          location: 'Croatia',
        },
      },
      preference: {
        create: {},
      },
    },
  });

  console.log({ alice, bob });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error('Failed to seed: ', err);
    await prisma.$disconnect();
    process.exit(1);
  });
