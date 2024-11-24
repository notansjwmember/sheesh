"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/users", userController_1.createUserController);
router.get("/users", userController_1.findAllUsersController);
router.get("/users/:key", userController_1.findOneUserController);
router.put("/users/:key", userController_1.updateUserController);
router.delete("/users/:key", userController_1.deleteUserController);
exports.default = router;
