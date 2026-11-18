export interface Post{
    id: string,
    title: string,
    content: string,
    category: string,
    createdAt: Date,
    updatedAt: Date
}


export interface createPostBody{
    title: string;
    content: string;
    category: string;
}

export interface updatePostBody{
    title?:string;
    content?:string;
}

export interface PostParams {
    id: string;
}

export  interface PostQuery{
    category?: string;
    limit?: string;
}
