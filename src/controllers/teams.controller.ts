import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import client from "../utils/dbCollection";
const teamMembersCollection = client
  .db("gadgetsEmporium")
  .collection("teamMembers");

export const getTeamMembers = async (req: Request, res: Response) => {
  const teamMembers = await teamMembersCollection.find({}).toArray();
  res.send(teamMembers);
};

export const addTeamMembers = async (req: Request, res: Response) => {
  const teamMember = req.body;
  const result = await teamMembersCollection.insertOne(teamMember);
  res.send(result);
};

export const deleteTeamMembers = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await teamMembersCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};
