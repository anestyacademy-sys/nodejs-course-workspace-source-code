import { z } from 'zod';

export const registerUserSchema = z.object({

    name: z
        .string('name is required string')
        .min(2, 'name must be at least 2 characters')
        .max(50, 'name cannot exceed 50 characters')
        .trim(),

    email: z
        .string('name is required')
        .email('invalid format')
        .toLowerCase()
        .trim(),

    password: z
        .string('password is required string')
        .min(6, 'pass must be at least 6 characters')
        .max(100, 'pass cannot exceed 100 characters')
        .trim(),

})


export const loginUserSchema = z.object({

    email: z
        .string('name is required')
        .email('invalid format')
        .toLowerCase()
        .trim(),

    password: z
        .string('password is required string')
        .min(6, 'pass must be at least 6 characters')
        .max(100, 'pass cannot exceed 100 characters')
        .trim(),

})

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;