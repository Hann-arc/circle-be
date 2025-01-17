"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const likeRoute = express_1.default.Router();
likeRoute.post("/:threadId/", likeController_1.toggleLike);
exports.default = likeRoute;
