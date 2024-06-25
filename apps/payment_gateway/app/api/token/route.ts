import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId, amount } = await req.json();
    if (!userId || !amount) {
      return NextResponse.json({ error: "userId and amount are required" });
    }
    const secret: string = process.env.JWT_SECRET || "";
    //create token
    const token = jwt.sign({ userId: userId, amount: amount }, secret, {
      expiresIn: "1h",
    });
    return NextResponse.json({
      message: "transaction agreed ! ",
      token: token,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e });
  }
};
