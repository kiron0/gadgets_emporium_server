import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../utils/dbCollection";
const productsCollection = client.db("gadgetsEmporium").collection("products");
const teamsCollection = client.db("gadgetsEmporium").collection("teams");
const addToCartCollection = client.db("gadgetsEmporium").collection("cart");

export const getProductsSort = async (req: Request, res: Response) => {
  let sort;
  if (req.query.sort) {
    sort = { _id: -1 } as any;
  }
  const parts = await productsCollection.find({}).sort(sort).toArray();
  res.send(parts);
};

export const getAllProducts = async (req: Request, res: Response) => {
  const result = await productsCollection.find({}).toArray();
  res.send({ success: true, result: result });
};

export const searchProducts = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const searchText = q.toLowerCase();
  const result = await productsCollection.find({}).toArray();
  const searchedResult = result.filter((product) =>
    product.productName.toLowerCase().includes(searchText)
  );
  res.send(searchedResult);
};

export const addProduct = async (req: Request, res: Response) => {
  const parts = req.body;
  const result = await productsCollection.insertOne(parts);
  res.send(result);
};

export const getProductById = async (req: Request, res: Response) => {
  const parts = await productsCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(parts);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productsCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

export const updateStockProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: body,
  };
  const updatedBooking = await productsCollection.updateOne(
    filter,
    updatedDoc,
    options
  );
  res.send(updatedBooking);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const query = {
    email: req.body.email,
    title: req.body.title,
  };
  const exists = await productsCollection.findOne(query);
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body },
    { upsert: true }
  );
  if (exists) {
    return res.send({ success: false, order: exists });
  } else {
    res.send({ success: true, order: result });
  }
};

export const updateQuantity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: body,
  };
  const updatedBooking = await productsCollection.updateOne(
    filter,
    updatedDoc,
    options
  );
  res.send(updatedBooking);
};

export const getCarts = async (req: Request, res: Response) => {
  const uid = req.query.uid;
  const decodedID = req.body.user.uid;
  const query = { uid: uid };
  if (decodedID === uid) {
    const myOrders = await addToCartCollection.find(query).toArray();
    return res.send(myOrders);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const cart = req.body;
  const exists = await addToCartCollection.findOne({
    uid: cart.uid,
    id: cart.productInfo.id,
  });
  if (exists) {
    return res.send({ success: false, order: exists });
  } else {
    const result = await addToCartCollection.insertOne(cart);
    res.send({ success: true, order: result });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await addToCartCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

export const getTeams = async (req: Request, res: Response) => {
  const teams = await teamsCollection.find({}).toArray();
  res.send(teams);
};
