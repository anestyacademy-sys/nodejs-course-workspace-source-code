export interface productParams{
    id: string
}

export interface createProductBody{
    name: string,
    price: number,
    categoryId: string
}

export interface editProductBody{
    name?: string,
    price?: number,
    categoryId?: string
}


export interface productQuery{
    min?: string,
    max?: string
}
