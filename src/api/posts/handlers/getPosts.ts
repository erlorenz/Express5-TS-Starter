import { Request, Response } from 'express';
import * as PostsServices from '../services';
import { z, ZodError } from 'zod';
import { Post } from '../types/Post';
import logger from '../../../config/logger';
import {
	BadRequestException,
	HttpException,
} from '../../../utils/error/HttpExceptions';
import { validateBody } from '../../../utils/validation';

// Coerce user id to number
const userIdSchema = z.coerce.number().optional();
type UserId = z.infer<typeof userIdSchema>;

export async function getPosts(req: Request, res: Response) {
	// Validation
	const userId = validateBody<UserId>(userIdSchema, req.body);

	logger.info(`USERID: ${userId}`);

	let posts: Post[] = [];
	// Call some services
	if (!userId) {
		posts = await PostsServices.getAllPosts();
	}

	if (userId) {
		posts = await PostsServices.getPostsByUserId(userId);
	}

	res.status(200).send({
		data: posts,
	});
}
