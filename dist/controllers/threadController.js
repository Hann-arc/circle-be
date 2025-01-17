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
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadMe = exports.findThreadById = exports.getThreads = exports.deleteThread = exports.createThread = void 0;
const threadService = __importStar(require("../services/threadService"));
const threadRepository_1 = require("../repositories/threadRepository");
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const user = res.locals.user;
        if (!user) {
            res.status(400).json({ message: "Unauthorized" });
            return;
        }
        body.authorId = user.id;
        if (!body.content && !body.media) {
            res.status(400).json({ message: "Content or media is required" });
            return;
        }
        const file = req.file;
        const thread = yield threadService.createThread(body, file);
        res.status(201).json(thread);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.createThread = createThread;
const deleteThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const authorId = res.locals.user.id;
    console.log("authorId :", authorId);
    console.log("id :", id);
    if (!authorId) {
        res.status(400).json({ message: "Unauthorized" });
        return;
    }
    try {
        const thread = yield threadService.getThreadById(parseInt(id));
        if (!thread) {
            res.status(404).json({ message: "Thread not found" });
            return;
        }
        if (thread.authorId !== authorId) {
            res.status(400).json({ message: "Unauthorized" });
            return;
        }
        const deleteThread = yield threadService.deleteThread(parseInt(id));
        res.status(201).json({ deleteThread, message: "Thread deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteThread = deleteThread;
const getThreads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thread = yield (0, threadRepository_1.findManyThreads)();
        res.status(200).json(thread);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.getThreads = getThreads;
const findThreadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const authorId = res.locals.user.id;
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "Invalid ID", authorId });
        return;
    }
    try {
        const findUniqueThread = yield threadService.getThreadById(parseInt(id));
        if (!findUniqueThread) {
            res.status(404).json({ message: "Thread not found" });
            return;
        }
        res.status(200).json(findUniqueThread);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.findThreadById = findThreadById;
const threadMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (!user || !user.id) {
        res.status(400).json({ message: "Unauthorized" });
        return;
    }
    try {
        const threads = yield threadService.getThreadUser(user.id);
        if (!threads || threads.length === 0) {
            res.status(404).json({ message: "No threads found for this user" });
            return;
        }
        res.status(200).json(threads);
    }
    catch (error) {
        console.error("Error fetching threads for user:", error);
        res.status(500).json({ message: "Error fetching threads" });
    }
});
exports.threadMe = threadMe;
