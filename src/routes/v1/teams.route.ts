import { Router } from "express";
const router: Router = Router();
import { VerifyToken } from "../../middlewares/VerifyToken";

import {
  getTeamMembers,
  addTeamMembers,
  deleteTeamMembers,
} from "../../controllers/teams.controller";

router.get("/teamMembers", VerifyToken, getTeamMembers);
router.post("/teamMembers", VerifyToken, addTeamMembers);
router.delete("/teamMembers/:id", VerifyToken, deleteTeamMembers);

export default router;
