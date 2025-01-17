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
exports.login = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedEmail = yield (0, userRepository_1.findUniqueUserByEmail)(user.email);
    if (existedEmail) {
        throw new Error("Email already used");
    }
    const existedUserName = yield (0, userRepository_1.findUserByUserName)(user.userName);
    if (existedUserName) {
        throw new Error("User name already used");
    }
    user.password = yield bcrypt_1.default.hash(user.password, 10);
    return yield (0, userRepository_1.createUser)(user);
});
exports.registerUser = registerUser;
const login = (LoginDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = LoginDTO;
    const user = yield (0, userRepository_1.findUniqueUserByEmail)(email);
    if (!user) {
        throw new Error("Email or password is incorrect");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Email or password is incorrect");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, userName: user.userName, email: user.email }, process.env.JWT_SECRET);
    return token;
});
exports.login = login;
