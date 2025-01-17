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
exports.deleteThread = exports.getThreadUser = exports.findThreadById = exports.findManyThreads = exports.createThread = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const createThread = (thread) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.thread.create({
        data: {
            content: thread.content,
            media: thread.media,
            authorId: thread.authorId,
        },
    });
});
exports.createThread = createThread;
const findManyThreads = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.thread.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        userName: true,
                        fullName: true,
                        Profile: true,
                    },
                },
                replies: {
                    select: {
                        author: {
                            select: {
                                id: true,
                                userName: true,
                                fullName: true,
                                Profile: {
                                    select: {
                                        avatar: true
                                    }
                                }
                            },
                        },
                        content: true,
                        media: true
                    },
                },
                _count: {
                    select: {
                        replies: true,
                        likes: true
                    }
                }
            },
        });
    }
    catch (error) {
        console.error("Error fetching threads:", error);
        throw new Error("Unable to fetch threads");
    }
});
exports.findManyThreads = findManyThreads;
const findThreadById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.thread.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        userName: true,
                        fullName: true,
                        Profile: true,
                    },
                },
                replies: {
                    select: {
                        author: {
                            select: {
                                id: true,
                                userName: true,
                                fullName: true,
                                Profile: {
                                    select: {
                                        avatar: true
                                    }
                                }
                            },
                        },
                        content: true,
                        media: true
                    },
                },
                _count: {
                    select: {
                        replies: true,
                        likes: true
                    }
                }
            },
        });
    }
    catch (error) {
        console.error("Error fetching thread:", error);
        throw new Error("Unable to fetch thread");
    }
});
exports.findThreadById = findThreadById;
const getThreadUser = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.thread.findMany({
            where: { authorId },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        userName: true,
                        fullName: true,
                        Profile: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true
                    }
                }
            },
        });
    }
    catch (error) {
        console.error("Error fetching threads by user:", error);
        throw new Error("Unable to fetch threads by user");
    }
});
exports.getThreadUser = getThreadUser;
const deleteThread = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.thread.delete({
            where: { id },
        });
    }
    catch (error) {
        console.error("Error fetching thread:", error);
        throw new Error("Unable to fetch thread");
    }
});
exports.deleteThread = deleteThread;
