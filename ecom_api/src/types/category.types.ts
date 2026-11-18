export interface Category{
    id: string,
    name: string,
    description: string
}


export interface categoryParams{
    id: string
}

export interface createCategoryBody{
    name: string,
    description: string
}

export interface editCategoryBody{
    name?: string,
    description?: string
}