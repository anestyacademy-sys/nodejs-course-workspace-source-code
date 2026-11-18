import type { Request , Response } from 'express';
import type { Post, PostQuery, createPostBody, updatePostBody, PostParams } from '../types/post.types.ts'
import { sendError, sendSuccess } from '../utils/response.ts';


// Mock database
let posts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello World',
    category: 'tech',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'Hello World',
    category: 'ai',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];


export const listPost = (req: Request<any, any, any, PostQuery>, res: Response)=>{
    const { category , limit } = req.query;

    const maxLimit = limit ? parseInt(limit) : 10;

    let filtered = posts;

    if(category){
        filtered = filtered.filter(p=>p.category === category);
    }

    filtered = filtered.slice(0, maxLimit);

    sendSuccess(res, filtered)
}


export const getById = (req: Request<PostParams>, res: Response)=>{

    const { id } = req.params;

    const post = posts.find(p=>p.id === id);

    if(!post){
        return sendError(res, "post not found" , 404)
    }
    
    sendSuccess(res, post, 200)

}


export const createPost = (req: Request<any, any, createPostBody , any>, res: Response)=>{

    const { title, content, category } = req.body;

    const newPost : Post = {
        id: (posts.length + 1).toString(),
        title: title,
        content: content,
        category: category,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    posts.push(newPost);

    res.status(201).json(newPost);

}


export const editPost = (req: Request<PostParams, any, updatePostBody>, res: Response)=>{

    const { id } = req.params;
    const updates = req.body;

    const postIndex = posts.findIndex(p=> p.id=== id);

    if(postIndex === -1){
        return res.status(404).json({error: "post not found"});
    }

    const existingPost = posts[ postIndex ]!;

    posts[postIndex] = {
        ...existingPost,
        ...updates,
        updatedAt: new Date()
    }

    res.json(posts[postIndex])

    
}


export const deletePost = (req: Request<PostParams>, res: Response)=>{

    const { id } = req.params;

    const postIndex = posts.findIndex(p=>p.id === id);

    if(postIndex === -1){
        return res.status(404).json({"error": "post not found"});
    }

    posts.splice(postIndex, 1);

    res.status(204).send("deleted");
}