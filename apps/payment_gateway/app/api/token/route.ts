import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, amount } = req.body;
  //create token
  const token = jwt.sign(
    { userId, amount },
    "cnqinebriqenrbqherbni3hr19fn293fn293gf231",
  );
  return NextResponse.json({ token });
};
