const router = require("express").Router();
const VerifyToken = require("../../middlewares/VerifyToken");

const {
  getTeamMembers,
  addTeamMembers,
  deleteTeamMembers,
} = require("../../controllers/teamsController");

router.get("/teamMembers", VerifyToken, getTeamMembers);
router.post("/teamMembers", VerifyToken, addTeamMembers);
router.delete("/teamMembers/:id", VerifyToken, deleteTeamMembers);

module.exports = router;
