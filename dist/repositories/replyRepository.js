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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existThread = exports.findreplyByThread = exports.createReply = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const createReply = (reply) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.reply.create({
        data: {
            content: reply.content,
            media: reply.media,
            authorId: reply.authorId,
            threadId: reply.threadId,
        },
    });
});
exports.createReply = createReply;
const findreplyByThread = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.reply.findMany({
        where: { threadId },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    fullName: true,
                    userName: true,
                    Profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
        },
    });
});
exports.findreplyByThread = findreplyByThread;
const existThread = (reply) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.reply.findUnique({
        where: { id: reply.threadId },
    });
});
exports.existThread = existThread;
