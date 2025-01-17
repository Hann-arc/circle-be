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
exports.findUserByUSername = exports.suggestUser = exports.getUserByQuery = exports.findUserById = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = void 0;
const userService = __importStar(require("../services/userService"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUser();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(req.body);
        const createUser = yield userService.createUser(body);
        console.log("user created: ", createUser);
        res.json(createUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = res.locals.user.id;
        const { userName, fullName, bio, avatar, cover } = req.body;
        const profile = {
            avatar: avatar || "",
            cover: cover || "",
            bio: bio || "",
        };
        if (userName) {
            const existingUser = yield userService.getUserById(id);
            if (existingUser && existingUser.userName !== userName) {
                const existingUserName = yield userService.getUserByName(userName);
                if (existingUserName) {
                    res.status(400).json({ message: "Username already exist" });
                    return;
                }
            }
        }
        const files = req.files;
        const avatarFile = (_a = files.avatar) === null || _a === void 0 ? void 0 : _a[0];
        const coverFile = (_b = files.cover) === null || _b === void 0 ? void 0 : _b[0];
        const updatedUser = yield userService.updateUser({ id: +id, userName, fullName, profile }, { avatarFile, coverFile });
        res.status(201).json(updatedUser);
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const delateUser = yield userService.deleteUser(parseInt(id));
        res.json(delateUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const findUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findUniqueUser = yield userService.getUserById(parseInt(id));
        3;
        res.json({ findUniqueUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.findUserById = findUserById;
const getUserByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const userId = res.locals.user.id;
        const user = yield userService.getAllUser(name, userId);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.getUserByQuery = getUserByQuery;
const suggestUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        res.status(400).json({ message: "Unauthorized" });
        return;
    }
    try {
        console.log("User ID:", userId);
        const userRec = yield userService.suggestedUser(userId);
        res.status(200).json(userRec);
        return;
    }
    catch (error) {
        console.error("Error fetching suggested users:", error);
        res.status(500).json({
            message: error.message,
        });
        return;
    }
});
exports.suggestUser = suggestUser;
const findUserByUSername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    if (!name) {
        res.status(400).json({ message: "invalid username" });
        return;
    }
    try {
        const detailUser = yield userService.findUserByUserNameService(name);
        if (!detailUser) {
            res.status(400).json({ message: 'this user is not exist' });
            return;
        }
        res.status(200).json(detailUser);
        return;
    }
    catch (error) {
        console.error("Error fetching detail  users:", error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.findUserByUSername = findUserByUSername;
