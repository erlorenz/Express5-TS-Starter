import { Router } from 'express';
import * as PostsController from './controller';

export const postsRouter = Router();

postsRouter.get('/', PostsController.getPosts);
