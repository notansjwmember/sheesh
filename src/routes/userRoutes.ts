import express from "express";
import {
  createUserController,
  deleteUserController,
  findAllUsersController,
  findOneUserController,
  updateUserController,
} from "../controllers/userController";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", findAllUsersController);
router.get("/users/:key", findOneUserController);
router.put("/users/:key", updateUserController);
router.delete("/users/:key", deleteUserController);

export default router;
