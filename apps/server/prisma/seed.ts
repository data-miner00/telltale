import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      username: 'alice',
    },
    update: {},
    create: {
      email: 'alice@prisma.io',
      username: 'alice',
      password: 'callmealice',
      avatar_url: 'https://randomuser.me/api/portraits/women/18.jpg',
      description: 'Hi I am Alice',
      country: 'Hungary',
      joined_rooms: {
        create: {
          name: 'Hello Group',
          description: 'This is a testing group',
          is_dm: true,
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: {
      username: 'bob',
    },
    update: {},
    create: {
      email: 'bob@prisma.io',
      username: 'bob',
      password: 'callmebob',
      avatar_url: 'https://randomuser.me/api/portraits/men/18.jpg',
      description: 'Hi I am Bob',
      country: 'Croatia',
      joined_rooms: {
        connect: {
          id: 1,
        },
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
