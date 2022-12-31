import { Request, Response } from 'express';
import * as PostsServices from '../services';
import { z, ZodError } from 'zod';
import { Post } from '../types/Post';
import logger from '../../../config/logger';
import {
	BadRequestException,
	HttpException,
} from '../../../utils/error/HttpExceptions';

// Coerce user id to number
const userIdSchema = z.coerce.number().optional();

export async function getPosts(req: Request, res: Response) {
	// ZodError can be simplified to BadRequestError
	let userId: number | undefined;
	try {
		userId = userIdSchema.parse(req.query.userId);
	} catch (err) {
		throw new BadRequestException('Validation error in user ID');
	}

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
