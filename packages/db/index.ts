import { PrismaClient } from "@prisma/client";

//function to generate and return a new client
const generateClientSingleton = () => {
  return new PrismaClient({
    transactionOptions: {
      timeout: 10000,
    },
  });
};

//a global prisma object declaration
declare global {
  var prismaGlobal: undefined | ReturnType<typeof generateClientSingleton>;
}

//priams instance :
const prisma: ReturnType<typeof generateClientSingleton> =
  globalThis.prismaGlobal ?? generateClientSingleton();

//expose to others
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
