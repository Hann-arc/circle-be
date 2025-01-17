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
exports.login = exports.getMe = exports.register = void 0;
const authServices = __importStar(require("../services/authService"));
const prisma_1 = __importDefault(require("../libs/prisma"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const user = yield authServices.registerUser(body);
        res.json({
            message: "register berhasil broww",
            user,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.id;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                Thread: true,
                userName: true,
                fullName: true,
                followers: {
                    select: {
                        follower: {
                            select: {
                                id: true,
                                fullName: true,
                                userName: true,
                                Profile: {
                                    select: {
                                        avatar: true,
                                        bio: true,
                                        cover: true
                                    },
                                },
                            },
                        },
                    },
                },
                following: {
                    select: {
                        following: {
                            select: {
                                id: true,
                                fullName: true,
                                userName: true,
                                Profile: {
                                    select: {
                                        avatar: true,
                                        bio: true,
                                    },
                                },
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        likes: true,
                        replies: true
                    },
                },
                Profile: {
                    select: {
                        avatar: true,
                        bio: true,
                        cover: true
                    },
                },
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getMe = getMe;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const token = yield authServices.login(body);
        res.json({
            token,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
