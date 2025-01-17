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
exports.getFollowing = exports.getFollowers = exports.toggleFollow = void 0;
const followService = __importStar(require("../services/followsService"));
const toggleFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followingId } = req.body;
    const followerId = res.locals.user.id;
    if (!followingId) {
        res.status(400).json({ message: "following id is missing" });
    }
    if (!followerId) {
        res.status(400).json({ messgae: "Unauthorized" });
        return;
    }
    if (followerId === followingId) {
        res.status(400).json({ message: "You cannot follow yourself!" });
        return;
    }
    try {
        const existedFollower = yield followService.followerExists(followerId);
        const existedFollowing = yield followService.followingExists(followingId);
        if (!existedFollower || !existedFollowing) {
            res.status(400).json({ messgae: "Follower or Following user does not exist" });
            return;
        }
        const existingFollow = yield followService.existingFollow(followingId, followerId);
        if (!existingFollow) {
            const follow = yield followService.follow(followingId, followerId);
            res.status(200).json({ follow, message: "berhasil follow" });
            return;
        }
        const unFollow = yield followService.unFollow(followingId, followerId);
        res.status(200).json({ unFollow, message: "berhasil unfollow" });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.toggleFollow = toggleFollow;
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "User Id not definded" });
    }
    try {
        const followers = yield followService.getFollowers(parseInt(userId));
        // const totalFollowers = followers.length;
        res.status(200).json(followers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.getFollowers = getFollowers;
const getFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ message: "User Id not difinded" });
    }
    try {
        const following = yield followService.getFollowing(parseInt(userId));
        // const totalFollowing = following.length
        res.status(200).json(following);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.getFollowing = getFollowing;
