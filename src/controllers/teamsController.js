const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");
const teamMembersCollection = client
  .db("gadgetsEmporium")
  .collection("teamMembers");

const getTeamMembers = async (req, res) => {
  const teamMembers = await teamMembersCollection.find({}).toArray();
  res.send(teamMembers);
};

const addTeamMembers = async (req, res) => {
  const teamMember = req.body;
  const result = await teamMembersCollection.insertOne(teamMember);
  res.send(result);
};

const deleteTeamMembers = async (req, res) => {
  const id = req.params.id;
  const result = await teamMembersCollection.deleteOne({
    _id: ObjectId(id),
  });
  res.send(result);
};

module.exports = {
  getTeamMembers,
  addTeamMembers,
  deleteTeamMembers,
};
