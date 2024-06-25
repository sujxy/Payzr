"use server";
import jwt from "jsonwebtoken";

export default async function DecodeJWT(token: string) {
  const secret: string = process.env.JWT_SECRET ?? "";

  try {
    const payload = jwt.verify(token, secret);

    const userId = payload?.userId;
    const amount = payload?.amount;

    return { userId, amount: (Number(amount) / 100).toString() };
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return JSON.stringify({ error: "Invalid token" });
  }
}
