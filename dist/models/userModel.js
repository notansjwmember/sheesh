"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserModel = void 0;
const idGenerator_1 = require("../utilities/idGenerator");
const createUserModel = (firstName, lastName) => {
    return {
        id: (0, idGenerator_1.generateId)(),
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};
exports.createUserModel = createUserModel;
