const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");
const orderCollection = client.db("gadgetsEmporium").collection("orders");

const getAllOrders = async (req, res) => {
  const orders = await orderCollection.find({}).toArray();
  res.send(orders);
};

const getOrders = async (req, res) => {
  const uid = req.query.uid;
  const decodedID = req.decoded.uid;
  const query = { uid: uid };
  if (decodedID === uid) {
    const myOrders = await orderCollection.find(query).toArray();
    return res.send(myOrders);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

const addOrder = async (req, res) => {
  const order = req.body;
  const exists = await orderCollection.findOne({
    uid: order.uid,
    id: order.productInfo.id,
  });
  if (exists) {
    return res.send({ success: false, order: exists });
  } else {
    const result = await orderCollection.insertOne(order);
    res.send({ success: true, order: result });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  const result = await orderCollection.deleteOne({ _id: ObjectId(id) });
  res.send(result);
};

const paidOrder = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: body,
  };
  const updatedBooking = await orderCollection.updateOne(
    filter,
    updatedDoc,
    options
  );
  res.send(updatedBooking);
};

const shippedOrder = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: ObjectId(id) };
  const updatedDoc = {
    $set: body,
  };
  const updatedBooking = await orderCollection.updateOne(filter, updatedDoc);
  res.send(updatedBooking);
};

module.exports = {
  getAllOrders,
  getOrders,
  addOrder,
  deleteOrder,
  paidOrder,
  shippedOrder,
};
