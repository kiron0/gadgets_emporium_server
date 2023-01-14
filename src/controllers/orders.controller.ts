import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../utils/dbCollection";
const orderCollection = client.db("gadgetsEmporium").collection("orders");

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderCollection.find({}).toArray();
  res.send(orders);
};

export const getOrders = async (req: Request, res: Response) => {
  const uid = req.query.uid;
  const decodedID = req.body.user.uid;
  const query = { uid: uid };
  if (decodedID === uid) {
    const myOrders = await orderCollection.find(query).toArray();
    return res.send(myOrders);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

export const addOrder = async (req: Request, res: Response) => {
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

export const deleteOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await orderCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

export const paidOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: new ObjectId(id) };
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

export const shippedOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: body,
  };
  const updatedBooking = await orderCollection.updateOne(filter, updatedDoc);
  res.send(updatedBooking);
};
