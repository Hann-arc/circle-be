"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReplyByThread = exports.createReply = void 0;
const replyService = __importStar(require("../services/replyService"));
const prisma_1 = __importDefault(require("../libs/prisma"));
const createReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
    const threadId = parseInt(req.params.threadId, 10);
    const { content, media } = req.body;
    if (!authorId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if (!threadId) {
        res.status(400).json({ message: "No thread specified" });
        return;
    }
    if (!content && !media) {
        res.status(400).json({ message: "Content or media is required" });
    }
    try {
        const threadExists = yield prisma_1.default.thread.findUnique({
            where: { id: threadId },
        });
        if (!threadExists) {
            res.status(404).json({ message: "Thread not found" });
            return;
        }
        const file = req.file;
        const reply = yield replyService.createReply({
            content,
            media,
            authorId,
            threadId,
        }, file);
        res.status(201).json(reply);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the reply" });
    }
});
exports.createReply = createReply;
const getReplyByThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { threadId } = req.params;
    if (!threadId) {
        res.status(400).json({ message: "No thread exist" });
        return;
    }
    try {
        const getReply = yield replyService.getReplyByThread(parseInt(threadId));
        if (!getReply) {
            res.status(400).json({ message: "no reply eexist" });
            return;
        }
        res.status(200).json(getReply);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.getReplyByThread = getReplyByThread;
