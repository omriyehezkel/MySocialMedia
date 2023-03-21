import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriend

} from "../controllers/user.js";
import {verifyToken} from "../middleware/auth.js";
const router = express.Router();

//read
router.get("/:id" , verifyToken,getUser);
router.get("/:id/frieds",verifyToken,getUserFriends);

//update
router.patch("/:id/:friendId" , verifyToken,addRemoveFriend);
export default router;