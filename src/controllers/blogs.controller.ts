import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../utils/dbCollection";
const blogsCollection = client.db("gadgetsEmporium").collection("blogs");

export const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await blogsCollection.find({}).toArray();
  res.send(blogs);
};

export const getBlogs = async (req: Request, res: Response) => {
  const userId = req.query.uid;
  const decodedID = req.body.user.uid;
  const query = { "author.uid": userId };
  if (decodedID === userId) {
    const result = await blogsCollection.find(query).toArray();
    res.send(result);
  } else {
    res.status(403).send({ success: false, message: "forbidden request" });
  }
};

export const updateBlogs = async (req: Request, res: Response) => {
  const userId = req.query.uid;
  const decodedID = req.body.user.uid;
  const id = req.query.editId;
  const data = req.body;
  if (userId === decodedID) {
    const options = { upsert: true };
    const query = { _id: new ObjectId(id as string) };
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

export const deleteBlogs = async (req: Request, res: Response) => {
  const userId = req.query.uid;
  const deleteId = req.query.deletedId;
  const decodedID = req.body.user.uid;
  if (userId === decodedID) {
    const query = { _id: new ObjectId(deleteId as string) };
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

export const searchBlogs = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const searchText = q.toLowerCase();
  const result = await blogsCollection.find({}).toArray();
  const searchedResult = result.filter((blogs) =>
    blogs.title.toLowerCase().includes(searchText)
  );
  res.send(searchedResult);
};

export const getBlogById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
  res.send(blog);
};

export const postBlogs = async (req: Request, res: Response) => {
  const blog = req.body;
  const result = await blogsCollection.insertOne(blog);
  res.send(result);
};
