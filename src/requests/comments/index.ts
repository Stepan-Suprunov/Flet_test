import {CommentType} from '../../types';

export const fetchComments = async (postId: number): Promise<CommentType[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    };

    return response.json();
};