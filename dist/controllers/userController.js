"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.findOneUserController = exports.findAllUsersController = exports.createUserController = void 0;
const userService_1 = require("../services/userService");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName } = req.body;
        let errors = [];
        if (!firstName)
            errors.push("First name is required.");
        if (!lastName)
            errors.push("Last name is required");
        if (!firstName || !lastName)
            return res.status(400).json({ message: errors });
        const newUser = yield (0, userService_1.createUser)(firstName, lastName);
        if (!newUser) {
            return res.status(500).json({ message: "User already exists." });
        }
        return res.status(200).json({ message: "Created user", user: newUser });
    }
    catch (error) {
        console.error("Error occured while creating users:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.createUserController = createUserController;
const findAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.findAllUsers)();
        if (!users) {
            console.log("Could not fetch all users.");
            return res.status(500).json({ message: "Could not fetch all users." });
        }
        return res.status(200).json({ message: "Fetched all users", users: users });
    }
    catch (error) {
        console.error("Error occured while fetching all users:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.findAllUsersController = findAllUsersController;
const findOneUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const user = yield (0, userService_1.findOneUser)(key);
        if (!user) {
            console.error("User does not exist.");
            return res.status(404).json({ message: "User does not exist." });
        }
        return res.status(200).json({ message: "Found user", user: user });
    }
    catch (error) {
        console.error("Error occured while fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.findOneUserController = findOneUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const { firstName, lastName } = req.body;
        const updatedUser = yield (0, userService_1.updateUser)(key, firstName, lastName);
        if (!updatedUser) {
            console.error("User does not exist or could not be updated.");
            return res.status(404).json({ message: "User does not exist or could not be updated." });
        }
        res.status(200).json({ message: "Updated user", updatedUser: updatedUser });
    }
    catch (error) {
        console.error("Error occured while updating user:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        const deletedUser = yield (0, userService_1.deleteUser)(key);
        if (!deletedUser) {
            console.error("User does not exist or could not be deleted.");
            return res.status(404).json({ message: "User does not exist or could not be deleted." });
        }
        res.status(200).json({ message: "Deleted user", deletedUser: deletedUser });
    }
    catch (error) {
        console.error("Error occured while deleting user:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.deleteUserController = deleteUserController;
