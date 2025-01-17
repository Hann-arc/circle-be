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
exports.findUserByUserNameService = exports.suggestedUser = exports.getAllUser = exports.getUserByName = exports.getUserById = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
exports.getUser = getUser;
const userRepository = __importStar(require("../repositories/userRepository"));
const mediaService_1 = require("./mediaService");
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.findManyUser();
    });
}
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.createUser(user);
});
exports.createUser = createUser;
const updateUser = (user, files) => __awaiter(void 0, void 0, void 0, function* () {
    if (files === null || files === void 0 ? void 0 : files.avatarFile) {
        const avatarUrl = yield (0, mediaService_1.uploadToCloudinary)(files.avatarFile);
        if (user.profile) {
            user.profile.avatar = avatarUrl;
        }
    }
    if (files === null || files === void 0 ? void 0 : files.coverFile) {
        const coverUrl = yield (0, mediaService_1.uploadToCloudinary)(files.coverFile);
        if (user.profile) {
            user.profile.cover = coverUrl;
        }
    }
    return yield userRepository.updateUser(user);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.deleteUser(id);
});
exports.deleteUser = deleteUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findUserById(id);
});
exports.getUserById = getUserById;
const getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findUserByName(name);
});
exports.getUserByName = getUserByName;
const getAllUser = (name, excludeUserId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findUser(name, excludeUserId);
});
exports.getAllUser = getAllUser;
const suggestedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.suggestedUser(userId);
});
exports.suggestedUser = suggestedUser;
const findUserByUserNameService = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findUserByUserName(userName);
});
exports.findUserByUserNameService = findUserByUserNameService;
