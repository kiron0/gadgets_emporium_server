const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");
const blogsCollection = client.db("gadgetsEmporium").collection("blogs");

const getAllBlogs = async (req, res) => {
  const blogs = await blogsCollection.find({}).toArray();
  res.send(blogs);
};

const getBlogs = async (req, res) => {
  const userId = req.query.uid;
  const decodedID = req.decoded.uid;
  const query = { "author.uid": userId };
  if (decodedID === userId) {
    const result = await blogsCollection.find(query).toArray();
    res.send(result);
  } else {
    res.status(403).send({ success: false, message: "forbidden request" });
  }
};

const updateBlogs = async (req, res) => {
  const userId = req.query.uid;
  const decodedID = req.decoded.uid;
  const id = req.query.editId;
  const data = req.body;
  if (userId === decodedID) {
    const options = { upsert: true };
    const query = { _id: ObjectId(id) };
    const updateDoc = {
      $set: data,
    };
    const result = await blogsCollection.updateOne(query, updateDoc, options);
    if (result.acknowledged) {
      res.send({
        success: true,
        message: "Updated blog successfully done.",
      });
    }
  } else {
    res.status(403).send({ success: false, message: "forbidden request" });
  }
};

const deleteBlogs = async (req, res) => {
  const userId = req.query.uid;
  const deleteId = req.query.deletedId;
  const decodedID = req.decoded.uid;
  if (userId === decodedID) {
    const query = { _id: ObjectId(deleteId) };
    const result = await blogsCollection.deleteOne(query);
    if (result.acknowledged) {
      res.send({
        success: true,
        message: "Blog deleted successfully done.",
      });
    }
  } else {
    res.status(403).send({ success: false, message: "forbidden request" });
  }
};

const searchBlogs = async (req, res) => {
  const searchText = req.query.q.toLowerCase();
  const result = await blogsCollection.find({}).toArray();
  const searchedResult = result.filter((blogs) =>
    blogs.title.toLowerCase().includes(searchText)
  );
  res.send(searchedResult);
};

const getBlogById = async (req, res) => {
  const id = req.params.id;
  const blog = await blogsCollection.findOne({ _id: ObjectId(id) });
  res.send(blog);
};

const postBlogs = async (req, res) => {
  const blog = req.body;
  const result = await blogsCollection.insertOne(blog);
  res.send(result);
};

module.exports = {
  getAllBlogs,
  getBlogs,
  updateBlogs,
  deleteBlogs,
  searchBlogs,
  getBlogById,
  postBlogs,
};
