import {PostType} from '../../types';

export const fetchPosts = async (): Promise<PostType[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts.');
    };

    return response.json();
};