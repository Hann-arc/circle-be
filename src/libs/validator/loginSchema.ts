import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email salah"),
    password: z.string().min(6, "pasword minimal 6 karakter ")
})

export type LoginSchema = z.infer<typeof loginSchema>
