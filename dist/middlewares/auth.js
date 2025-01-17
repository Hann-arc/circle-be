"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: "Unauthorized: Token not provided" });
        return;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized: Token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
    }
};
exports.authentication = authentication;
