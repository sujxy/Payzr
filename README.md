
# Payzr - Wallets & Payments

This project aims to simulate a Paytm type wallet & Peer-2-Peer payment app which mimics the platform as well as a webhook server to listen to onramp transactions.

## What has been done ?

1. This project is built in nextjs with a monorepo architecture .
2.  It has a client application with various pages for client side users .\
3.  Project has an express server which is clients backend webhook to listen to payments from payment provider.
4. A payment gateway page (banks side) .
5. Database locking and transactions to make all payments follow ACID properties.

## What has to be been done ?

1. Implement a redis based notification system and queuing payments .
2.  It has a client application with various pages for client side users .\
3.  Project has an express server which is clients backend webhook to listen to payments from payment provider.
4. A payment gateway page (banks side)



## Run Locally

Clone the project

```bash
  git clone https://github.com/sujxy/Payzr
```

Go to the project directory

```bash
  cd /Payzr
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
