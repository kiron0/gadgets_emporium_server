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

const getReviewsByUserId = async (req, res) => {
  const uid = req.query.uid;
  const decodedID = req.decoded.uid;
  const query = { "author.uid": uid };
  if (decodedID === uid) {
    const myReviews = await reviewsCollection.find(query).toArray();
    return res.send(myReviews);
  }
  return res.status(403).send({ message: "forbidden access" });
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
  getReviewsByUserId,
  postReview,
  deleteReview,
  updateReview,
  featureRequestPost,
};
