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
exports.getFollowing = exports.getFollowers = exports.Unfolow = exports.followingExists = exports.followerExists = exports.existingFollow = exports.followUser = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
// export const toggleFollow = async (followingId: number, followerId: number) => {
//   const existingFollow = await prisma.follows.findFirst({
//     where: {
//       followerId: followerId,
//       followingId: followingId,
//     },
//   });
//   if (existingFollow) {
//     await prisma.follows.delete({
//       where: {
//         id: existingFollow.id,
//       },
//     });
//     return { isFollowing: false };
//   } else {
//     await prisma.follows.create({
//       data: {
//         followerId,
//         followingId,
//       },
//     });
//     return { isFollowing: true };
//   }
// };
const followUser = (followingId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.follows.create({
        data: {
            followerId,
            followingId,
        },
    });
});
exports.followUser = followUser;
const existingFollow = (followingId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.follows.findFirst({
        where: {
            followerId,
            followingId,
        },
    });
});
exports.existingFollow = existingFollow;
const followerExists = (followerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id: followerId,
        },
    });
});
exports.followerExists = followerExists;
const followingExists = (followingId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id: followingId,
        },
    });
});
exports.followingExists = followingExists;
const Unfolow = (followingId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.follows.deleteMany({
        where: { followerId, followingId },
    });
});
exports.Unfolow = Unfolow;
const getFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.follows.findMany({
        where: { followingId: Number(userId) },
        include: {
            follower: {
                select: {
                    id: true,
                    fullName: true,
                    userName: true,
                    Profile: {
                        select: {
                            avatar: true,
                        },
                    },
                    _count: true,
                },
            },
        },
    });
});
exports.getFollowers = getFollowers;
const getFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.follows.findMany({
        where: { followerId: Number(userId) },
        include: {
            following: {
                select: {
                    id: true,
                    fullName: true,
                    userName: true,
                    Profile: {
                        select: {
                            avatar: true,
                        },
                    },
                    _count: true,
                },
            },
        },
    });
});
exports.getFollowing = getFollowing;
