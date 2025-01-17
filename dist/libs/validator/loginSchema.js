"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email salah"),
    password: zod_1.z.string().min(6, "pasword minimal 6 karakter ")
});
