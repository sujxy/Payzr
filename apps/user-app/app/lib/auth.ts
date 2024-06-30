import client from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// const userSchema = zod.object({
//   name: zod.string(),
//   phone: zod.number().min(10).max(10),
//   email: zod.string(),
//   password: zod.string().min(6).max(18),
// });

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@email.com",
          required: true,
        },
        phone: { label: "Phone", type: "number", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await client.user.findFirst({
          where: {
            phone: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password,
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              phone: existingUser.phone,
            };
          }
          return null;
        }

        try {
          const user = await client.user.upsert({
            where: {
              email: credentials.email,
            },
            update: {},
            create: {
              phone: credentials.phone,
              name: "User",
              email: credentials.email,
              password: hashedPassword,
              account: {
                create: {
                  balance: 0,
                  locked: 0,
                },
              },
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
