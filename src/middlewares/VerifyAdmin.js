const client = require("../utils/dbConnect");
const usersCollection = client.db("gadgetsEmporium").collection("users");

const VerifyAdmin = async (req, res, next) => {
  const requester = req?.decoded?.email;
  const requesterAccount = await usersCollection.findOne({
    email: requester,
  });
  if (requesterAccount?.role === "admin") {
    next();
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};

module.exports = VerifyAdmin;
