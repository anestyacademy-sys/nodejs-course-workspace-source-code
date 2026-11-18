import { z } from 'zod';


export const createProductSchema = z.object({

    name: z
        .string('name must be a string')
        .min(2, 'name must be at least 2 characters')
        .max(100, 'name cannot exceed 100 characters')
        .trim(),

    price: z
        .coerce
        .number('price must be a number')
        .min(0, 'price cannot be negative'),

    discount: z
        .number('discount must be a number')
        .min(0, 'discount cannot be negative')
        .max(100 , 'discount cannot exceed 100')
        .optional()
        .default(0),

    categoryId: z   
        .string('category id must be a string')
        .length(24, 'invalid id format')
        .regex(/^[A-Za-z0-9]{24}$/ , 'Invalid id')

})


export const editProductSchema = z.object({

    name: z
        .string('name must be a string')
        .min(2, 'name must be at least 2 characters')
        .max(100, 'name cannot exceed 100 characters')
        .trim()
        .optional(),


    price: z
        .coerce
        .number('price must be a number')
        .min(0, 'price cannot be negative')
        .optional(),

    discount: z
        .number('discount must be a number')
        .min(0, 'discount cannot be negative')
        .max(100 , 'discount cannot exceed 100')
        .optional()
        .default(0),

    categoryId: z   
        .string('category id must be a string')
        .length(24, 'invalid id format')
        .regex(/^[A-Za-z0-9]{24}$/ , 'Invalid id')
        .optional()

})


export const productIdSchema = z.object({
    id: z
        .string('id must be a string')
        .length(24, 'invalid id format')
        .regex(/^[A-Za-z0-9]{24}$/ , 'Invalid id')
})


export type CreateProductInput = z.infer<typeof createProductSchema>
export type EditProductInput = z.infer<typeof editProductSchema>
export type ProductIdInput = z.infer<typeof productIdSchema>
