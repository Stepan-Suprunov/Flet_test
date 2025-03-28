import {CommentType} from '../../types';
import {Loader} from '../index.ts';
import styles from './style.module.css'

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
        <div className={styles.commentsContainer}>
            <h3 className={styles.commentsTitle}>Комментарии ({comments.length})</h3>
            <ul className={styles.commentsList}>
                {comments.map((comment: CommentType) => (
                    <li key={comment.id} className={styles.commentItem}>
                        <h4 className={styles.commentName}>{comment.name}</h4>
                        <p className={styles.commentBody}>{comment.body}</p>
                        <p className={styles.commentEmail}>От: {comment.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};