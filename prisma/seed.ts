/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function createCountry() {
  return await prisma.country.create({
    data: {
      name: 'Pakistan',
      code: '+92',
      short_code: 'PK',
    },
  });
}

async function createState() {
  const country = await prisma.country.findFirstOrThrow();

  return await prisma.state.createMany({
    data: [
      {
        name: 'Sindh',
        country_id: country.id,
      },
      {
        name: 'Punjab',
        country_id: country.id,
      },
    ],
  });
}

async function createCity() {
  const country = await prisma.country.findFirstOrThrow();

  const sindh = await prisma.state.findFirstOrThrow({
    where: {
      name: 'Sindh',
    },
  });

  const punjab = await prisma.state.findFirstOrThrow({
    where: {
      name: 'Punjab',
    },
  });

  return await prisma.city.createMany({
    data: [
      {
        name: 'Karachi',
        country_id: country.id,
        state_id: sindh.id,
      },
      {
        name: 'Lahore',
        country_id: country.id,
        state_id: punjab.id,
      },
    ],
  });
}

async function registerSuperAdmin() {
  const encPassword = await argon.hash('superadmin@123');

  const city = await prisma.city.findFirstOrThrow({
    where: {
      name: 'Karachi',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'superadmin@email.com',
      password: encPassword,
      first_name: 'WSC',
      last_name: 'Superadmin',
      role: 'SUPERADMIN',
      dob: new Date(),
      is_active: true,
      title: 'MR',
      gender: 'MALE',
      city: {
        connect: {
          id: city.id,
        },
      },
      user_access_rights: {
        create: {
          category_module: true,
          product_module: true,
          attribute_module: true,
          cms_module: true,
          newsletter_module: true,
        },
      },
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      role: true,
      dob: true,
      is_active: true,
      title: true,
      gender: true,
      telephone: true,
      image_uri: true,
      created_at: true,
      updated_at: true,
      city: {
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true,
          country: {
            select: {
              id: true,
              name: true,
              short_code: true,
              code: true,
              created_at: true,
              updated_at: true,
            },
          },
          state: {
            select: {
              id: true,
              name: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
      },
      user_access_rights: true,
    },
  });

  console.log(user);
}

async function registerStoreOwner() {
  const encPassword = await argon.hash('storeowner@123');

  const city = await prisma.city.findFirstOrThrow({
    where: {
      name: 'Lahore',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'storeowner@email.com',
      password: encPassword,
      first_name: 'Store',
      last_name: 'Owner',
      role: 'STORE_OWNER',
      dob: new Date(),
      is_active: true,
      title: 'MRS',
      gender: 'FEMALE',
      city: {
        connect: {
          id: city.id,
        },
      },
      user_access_rights: {
        create: {
          category_module: true,
          product_module: true,
          attribute_module: true,
          cms_module: true,
          newsletter_module: true,
        },
      },
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      role: true,
      dob: true,
      is_active: true,
      title: true,
      gender: true,
      telephone: true,
      image_uri: true,
      created_at: true,
      updated_at: true,
      city: {
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true,
          country: {
            select: {
              id: true,
              name: true,
              short_code: true,
              code: true,
              created_at: true,
              updated_at: true,
            },
          },
          state: {
            select: {
              id: true,
              name: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
      },
      user_access_rights: true,
    },
  });

  console.log(user);
}

async function main() {
  await createCountry();
  await createState();
  await createCity();
  await registerSuperAdmin();
  await registerStoreOwner();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
