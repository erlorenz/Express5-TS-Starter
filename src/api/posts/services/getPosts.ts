import fetch from 'node-fetch';
import config from '../../../config';
import { Post } from '../types/Post';

export async function getAllPosts() {
	const res = await fetch(`${config.API_URL}/posts`);
	const posts = (await res.json()) as Post[];
	return posts;
}

export async function getPostsByUserId(userId: number) {
	const res = await fetch(`${config.API_URL}/posts/${userId}`);
	const posts = (await res.json()) as Post[];
	return posts;
}
