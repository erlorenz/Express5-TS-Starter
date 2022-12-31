import { Router } from "express";
import * as PostsHandlers from "./handlers";

export const postsRouter = Router();

postsRouter.get("/", PostsHandlers.getPosts);
