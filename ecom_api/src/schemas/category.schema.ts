import { z } from 'zod';

export const createCategorySchema = z.object({

    name: z
        .string('Category name must be a string')
        .min(2, 'category name must be at least 2 characters')
        .max(50, 'category cannot exceed 50 characters')
        .trim(),

    description: z
        .string('Category name must be a string')
        .min(10, 'category name must be at least 10 characters')
        .max(200, 'category cannot exceed 200 characters')
        .trim()


})


export const editCategorySchema = z.object({

    name: z
        .string('Category name must be a string')
        .min(2, 'category name must be at least 2 characters')
        .max(50, 'category cannot exceed 50 characters')
        .trim()
        .optional(),

    description: z
        .string('Category name must be a string')
        .min(10, 'category name must be at least 10 characters')
        .max(200, 'category cannot exceed 200 characters')
        .trim()
        .optional()


})


export const categoryIdSchema = z.object({
    id: z
        .string('id must be a string')
        .length(24, 'invalid id format')
        .regex(/^[A-Za-z0-9]{24}$/ , 'Invalid id')
})


export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type EditCategoryInput = z.infer<typeof editCategorySchema>
export type CategoryIdInput = z.infer<typeof categoryIdSchema>
