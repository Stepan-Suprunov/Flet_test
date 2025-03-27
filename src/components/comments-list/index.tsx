import {CommentType} from '../../types';
import {Loader} from '../index.ts';

type CommentsListPropsType = {
    comments: CommentType[] | null;
    loading: boolean;
    error: string | null;
}

export function CommentsList ({ comments, loading, error }: CommentsListPropsType) {

    if (loading) return <Loader/>
    if (error) return <div>{error}</div>;
    if (!comments) return null;

    return (
        <div>
            <h3>Комментарии ({comments.length})</h3>
            <ul>
                {comments.map((comment: CommentType) => (
                    <li key={comment.id}>
                        <h4>{comment.name}</h4>
                        <p>{comment.body}</p>
                        <p>От: {comment.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};