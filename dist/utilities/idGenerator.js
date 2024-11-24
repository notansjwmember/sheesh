"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve(__dirname, "counter.json");
const readCurrent = () => {
    try {
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        const counter = JSON.parse(data);
        return counter.current;
    }
    catch (error) {
        return 10000;
    }
};
const writeCurrent = (current) => {
    const data = JSON.stringify({ current });
    fs_1.default.writeFileSync(filePath, data, "utf-8");
};
const generateId = () => {
    const max = 90000;
    let current = readCurrent();
    if (current >= max) {
        throw new Error("Can't create new ID. We have reached the end...");
    }
    current++;
    writeCurrent(current);
    return current;
};
exports.generateId = generateId;
