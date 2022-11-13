const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");
const productsCollection = client.db("gadgetsEmporium").collection("products");
const teamsCollection = client.db("gadgetsEmporium").collection("teams");

const getProductsSort = async (req, res) => {
  let sort;
  if (req.query.sort) {
    sort = { _id: -1 };
  }
  const parts = await productsCollection.find({}).sort(sort).toArray();
  res.send(parts);
};

const getAllProducts = async (req, res) => {
  const result = await productsCollection.find({}).toArray();
  res.send({ success: true, result: result });
};

const searchProducts = async (req, res) => {
  const searchText = req.query.q.toLowerCase();
  const result = await productsCollection.find({}).toArray();
  const searchedResult = result.filter((product) =>
    product.productName.toLowerCase().includes(searchText)
  );
  res.send(searchedResult);
};

const addProduct = async (req, res) => {
  const parts = req.body;
  const result = await productsCollection.insertOne(parts);
  res.send(result);
};

const getProductById = async (req, res) => {
  const parts = await productsCollection.findOne({
    _id: ObjectId(req.params.id),
  });
  res.send(parts);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const result = await productsCollection.deleteOne({
    _id: ObjectId(id),
  });
  res.send(result);
};

const updateStockProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: ObjectId(id) };
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

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const query = {
    email: req.body.email,
    title: req.body.title,
  };
  const exists = await productsCollection.findOne(query);
  const result = await productsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: body },
    { upsert: true }
  );
  if (exists) {
    return res.send({ success: false, order: exists });
  } else {
    res.send({ success: true, order: result });
  }
};

const updateQuantity = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const filter = { _id: ObjectId(id) };
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

const getCarts = async (req, res) => {
  const uid = req.query.uid;
  const decodedID = req.decoded.uid;
  const query = { uid: uid };
  if (decodedID === uid) {
    const myOrders = await addToCartCollection.find(query).toArray();
    return res.send(myOrders);
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

const addToCart = async (req, res) => {
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

const deleteCart = async (req, res) => {
  const id = req.params.id;
  const result = await addToCartCollection.deleteOne({
    _id: ObjectId(id),
  });
  res.send(result);
};

const getTeams = async (req, res) => {
  const teams = await teamsCollection.find({}).toArray();
  res.send(teams);
};

module.exports = {
  getAllProducts,
  getProductsSort,
  searchProducts,
  addProduct,
  getProductById,
  deleteProduct,
  updateStockProduct,
  updateProduct,
  updateQuantity,
  getCarts,
  addToCart,
  deleteCart,
  getTeams,
};
