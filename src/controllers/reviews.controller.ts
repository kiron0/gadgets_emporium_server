import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../utils/dbCollection";
const reviewsCollection = client.db("gadgetsEmporium").collection("reviews");
const featureRequestCollection = client
  .db("gadgetsEmporium")
  .collection("featureRequest");

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await reviewsCollection.find({}).toArray();
  res.send(reviews);
};

export const getReviewsByUserId = async (req: Request, res: Response) => {
  const uid = req.query.uid;
  const decodedID = req.body.user.uid;
  const query = { "author.uid": uid };
  if (decodedID === uid) {
    const myReviews = await reviewsCollection.find(query).toArray();
    return res.send(myReviews);
  }
  return res.status(403).send({ message: "forbidden access" });
};

export const postReview = async (req: Request, res: Response) => {
  const review = req.body;
  const result = await reviewsCollection.insertOne(review);
  res.send(result);
};

export const deleteReview = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await reviewsCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

export const updateReview = async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = req.body;
  const result = await reviewsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: review }
  );
  res.send(result);
};

export const featureRequestPost = async (req: Request, res: Response) => {
  const featureRequest = req.body;
  const result = await featureRequestCollection.insertOne(featureRequest);
  if (result.acknowledged) {
    res.send({
      success: true,
      message: "Feature request sent successfully",
    });
  } else {
    res.send({ success: false, message: "Feature request failed" });
  }
  res.send({ result });
};