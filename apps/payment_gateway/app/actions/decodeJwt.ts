"use server";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function DecodeJWT(token: string | undefined) {
  const secret: string = process.env.JWT_SECRET ?? "";
  if (!token) return { error: "token not found" };
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;

    const userId = payload.userId;
    const amount = payload.amount;

    return { userId, amount: (Number(amount) / 100).toString() };
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return { error: "Invalid token" };
  }
}
