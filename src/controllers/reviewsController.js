const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");
const reviewsCollection = client.db("gadgetsEmporium").collection("reviews");
const featureRequestCollection = client
  .db("gadgetsEmporium")
  .collection("featureRequest");

const getReviews = async (req, res) => {
  const reviews = await reviewsCollection.find({}).toArray();
  res.send(reviews);
};

const postReview = async (req, res) => {
  const review = req.body;
  const result = await reviewsCollection.insertOne(review);
  res.send(result);
};

const deleteReview = async (req, res) => {
  const id = req.params.id;
  const result = await reviewsCollection.deleteOne({
    _id: ObjectId(id),
  });
  res.send(result);
};

const updateReview = async (req, res) => {
  const id = req.params.id;
  const review = req.body;
  const result = await reviewsCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: review }
  );
  res.send(result);
};

const featureRequestPost = async (req, res) => {
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

module.exports = {
  getReviews,
  postReview,
  deleteReview,
  updateReview,
  featureRequestPost,
};
