const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const client = require("../utils/dbConnect");
const paymentCollection = client.db("gadgetsEmporium").collection("payments");

const createPaymentIntent = async (req, res) => {
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

const createBooking = async (req, res) => {
  const id = req.query.id;
  const payment = req.body;
  const filter = { _id: ObjectId(id) };
  const result = await paymentCollection.insertOne(payment);
  res.send(result);
};

const getPaymentHistory = async (req, res) => {
  const uid = req.query.uid;
  if (uid) {
    const payment = await paymentCollection.find({ uid: uid }).toArray();
    res.send(payment);
  } else {
    res.status(403).send({ message: "forbidden access" });
  }
};

module.exports = {
  createPaymentIntent,
  createBooking,
  getPaymentHistory,
};
