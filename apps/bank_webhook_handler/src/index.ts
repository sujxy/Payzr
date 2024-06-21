import express from "express";
import client from "@repo/db/client";
const app = express();
app.use(express.json({}));

app.post("/hdfcWebhook", async (req, res) => {
  //verify bank req
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  //add tranaction to db and update balances
  try {
    //start a DB transaction for ACID
    await client.$transaction([
      client.account.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          balance: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      client.onRampTransactions.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    //success
    res.status(200).json({
      message: "captured",
    });
  } catch (error: any) {
    //failure
    await client.onRampTransactions.update({
      where: {
        token: paymentInformation.token,
      },
      data: {
        status: "Failure",
      },
    }),
      console.log(error);
    res.status(411).json({ message: "failed to capture " });
  }
});

app.listen(3003, () => {
  console.log("bank webhook handler running..");
});
