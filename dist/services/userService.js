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
exports.deleteUser = exports.updateUser = exports.findOneUser = exports.findAllUsers = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const fileHandler_1 = require("../utilities/fileHandler");
const createUser = (firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Creating user..");
        const data = yield (0, fileHandler_1.readFromUsers)();
        const users = data.users;
        const isConflict = users.some((user) => user.firstName === firstName && user.lastName === lastName);
        console.log(isConflict);
        if (isConflict) {
            console.log("User already exists");
            return null;
        }
        const newUser = (0, userModel_1.createUserModel)(firstName, lastName);
        console.log(newUser);
        users.push(newUser);
        console.log("Created the user successfully.");
        yield (0, fileHandler_1.writeToUsers)(data);
        return newUser;
    }
    catch (error) {
        console.error("Could not create user:", error);
        return null;
    }
});
exports.createUser = createUser;
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, fileHandler_1.readFromUsers)();
        console.log(`Fetching ${data.users.length} users..`);
        return data.users;
    }
    catch (error) {
        console.error("Error fetching all users:", error);
        return undefined;
    }
});
exports.findAllUsers = findAllUsers;
const findOneUser = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, fileHandler_1.readFromUsers)();
        const users = data.users;
        console.log(`Finding the user with their ID: ${key}..`);
        let user = users.find((user) => user.id === parseInt(key));
        console.log(`Could not find the user by ID.`);
        console.log(`Finding user with their first name: ${key}`);
        if (!user)
            user = users.find((user) => user.firstName.toLowerCase() === key.toLowerCase());
        if (!user) {
            console.error("Could not find the user with both their name and ID.");
            console.error("User probably does not exist.");
            return null;
        }
        console.log("Found user: ", user);
        return user;
    }
    catch (error) {
        console.error("Could not find user:", error);
        return null;
    }
});
exports.findOneUser = findOneUser;
const updateUser = (key, firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, fileHandler_1.readFromUsers)();
        let user = yield (0, exports.findOneUser)(key);
        if (!user) {
            console.error("Could not find the user with both their name and ID.");
            console.error("User probably does not exist.");
            return null;
        }
        if (firstName)
            user.firstName = firstName;
        if (lastName)
            user.lastName = lastName;
        user.updatedAt = new Date();
        yield (0, fileHandler_1.writeToUsers)(data);
        console.log("Updated user:", user);
        return user;
    }
    catch (error) {
        console.error("Could not update user:", error);
        return null;
    }
});
exports.updateUser = updateUser;
const deleteUser = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, fileHandler_1.readFromUsers)();
        const users = data.users;
        let userIndex = users.findIndex((user) => user.id === parseInt(key));
        if (userIndex === -1)
            userIndex = users.findIndex((user) => user.firstName.toLowerCase() === key.toLowerCase());
        if (userIndex === -1) {
            console.error("Could not find the user with both their name and ID.");
            console.error("User probably does not exist.");
            return null;
        }
        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);
        yield (0, fileHandler_1.writeToUsers)(data);
        console.log("Deleted user:", deletedUser);
        return deletedUser;
    }
    catch (error) {
        console.error("Could not delete user:", error);
        return null;
    }
});
exports.deleteUser = deleteUser;
