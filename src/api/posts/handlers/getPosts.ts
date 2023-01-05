import { Request, Response } from 'express';
import * as PostsServices from '../services';
import { z } from 'zod';
import { Post } from '../types/Post';
import logger from '../../../config/logger';
import { validateQuery } from '../../../utils/validateRequest';

// Request schema can be in separate DTO file if needed
// Coerce user id to number
const userIdSchema = z.object({
	userId: z.coerce.number().optional(),
});

export async function getPosts(req: Request, res: Response) {
	// Validation
	const { userId } = validateQuery(userIdSchema, req.query);

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
