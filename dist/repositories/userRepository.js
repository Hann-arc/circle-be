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
exports.suggestedUser = exports.updateUser = exports.findUser = exports.findUserByName = exports.findUserById = exports.findUniqueUserByEmail = exports.deleteUser = exports.findManyUser = exports.findUserByUserName = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.create({
        data: {
            email: user.email,
            fullName: user.fullName,
            password: user.password,
            userName: user.userName,
        },
    });
});
exports.createUser = createUser;
const findUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { userName },
        include: {
            _count: {
                select: {
                    followers: true,
                    likes: true,
                    following: true,
                },
            },
            Profile: {
                select: {
                    avatar: true,
                    bio: true,
                    cover: true,
                },
            },
            Thread: {
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    content: true,
                    media: true,
                    createdAt: true
                },
            },
        },
    });
});
exports.findUserByUserName = findUserByUserName;
const findManyUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany();
});
exports.findManyUser = findManyUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
const findUniqueUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { email },
    });
});
exports.findUniqueUserByEmail = findUniqueUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { id },
    });
});
exports.findUserById = findUserById;
const findUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            userName: name,
        },
        include: {
            Profile: {
                select: {
                    avatar: true,
                    bio: true,
                },
            },
        },
    });
});
exports.findUserByName = findUserByName;
const findUser = (query, excludeUserId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany({
        where: {
            AND: [
                {
                    id: {
                        not: excludeUserId,
                    },
                },
                {
                    OR: [
                        {
                            userName: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                        {
                            fullName: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
            ],
        },
        include: {
            Profile: {
                select: {
                    avatar: true,
                    bio: true,
                },
            },
        },
    });
});
exports.findUser = findUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    return yield prisma_1.default.user.update({
        where: { id: user.id },
        data: {
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            password: user.password,
            Profile: {
                upsert: {
                    create: {
                        avatar: ((_a = user.profile) === null || _a === void 0 ? void 0 : _a.avatar) || "",
                        cover: ((_b = user.profile) === null || _b === void 0 ? void 0 : _b.cover) || "",
                        bio: ((_c = user.profile) === null || _c === void 0 ? void 0 : _c.bio) || "",
                    },
                    update: {
                        avatar: ((_d = user.profile) === null || _d === void 0 ? void 0 : _d.avatar) || "",
                        cover: ((_e = user.profile) === null || _e === void 0 ? void 0 : _e.cover) || "",
                        bio: ((_f = user.profile) === null || _f === void 0 ? void 0 : _f.bio) || "",
                    },
                },
            },
        },
        include: {
            Profile: true,
        },
    });
});
exports.updateUser = updateUser;
const suggestedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany({
        where: {
            id: {
                not: userId,
            },
            following: {
                some: {
                    followingId: userId,
                },
            },
            NOT: {
                followers: {
                    some: {
                        followerId: userId,
                    },
                },
            },
        },
        orderBy: {
            followers: {
                _count: "desc",
            },
        },
        select: {
            id: true,
            userName: true,
            fullName: true,
            email: true,
            followers: true,
            following: true,
            _count: {
                select: {
                    followers: true,
                    following: true,
                },
            },
            Profile: {
                select: {
                    avatar: true,
                },
            },
        },
        take: 5,
    });
});
exports.suggestedUser = suggestedUser;
