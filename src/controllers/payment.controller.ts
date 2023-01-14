import { Request, Response } from "express";
import { ObjectId } from "mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import client from "../utils/dbCollection";
const paymentCollection = client.db("gadgetsEmporium").collection("payments");

export const createPaymentIntent = async (req: Request, res: Response) => {
  const data = req.body;
  const price = data.price;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};

export const createBooking = async (req: Request, res: Response) => {
  const id = req.query.id;
  const payment = req.body;
  const filter = { _id: new ObjectId(id as string) };
  const result = await paymentCollection.insertOne(payment);
  res.send(result);
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  const uid = req.query.uid;
  if (uid) {
    const payment = await paymentCollection.find({ uid: uid }).toArray();
    res.send(payment);
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
};
