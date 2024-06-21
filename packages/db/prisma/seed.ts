import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

async function main() {
  const kim = await client.user.upsert({
    where: {
      email: "kim@gmail.com",
    },
    update: {},
    create: {
      phone: "1111122222",
      name: "Kimberley",
      email: "kim@gmail.com",
      password: await bcrypt.hash("123456", 10),
      account: {
        create: {
          balance: 200000,
          locked: 0,
        },
      },
      OnRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token_123",
          provider: "HDFC Bank",
          type: "credit",
        },
      },
    },
  });

  const raghav = await client.user.upsert({
    where: {
      email: "raghav@gmail.com",
    },
    update: {},
    create: {
      phone: "3333322222",
      name: "Raghav",
      email: "raghav@gmail.com",
      password: await bcrypt.hash("123456", 10),
      account: {
        create: {
          balance: 100000,
          locked: 0,
        },
      },
      OnRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 20000,
          token: "token_12345",
          provider: "Axis Bank",
          type: "credit",
        },
      },
    },
  });

  console.log({ kim, raghav });
}

main()
  .then(async () => await client.$disconnect())
  .catch(async (error) => {
    console.log("error while seeding" + error);
    await client.$disconnect();
    process.exit(1);
  });
