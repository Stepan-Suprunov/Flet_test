import {PostType} from '../../types';
import {useEffect, useState} from 'react';
import {CommentsList, UserInfo} from '../index.ts';
import styles from './style.module.css'
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {loadUser} from '../../store/slices/user-slice.ts';
import {loadComments} from '../../store/slices/comments-slice.ts';

type PostDetailsPropsType = {
    post: PostType;
};

export function PostDetails({post}: PostDetailsPropsType) {
    const dispatch = useAppDispatch();
    const [showComments, setShowComments] = useState<boolean>(false);

    const {user, loading: userLoading, error: userError} = useAppSelector((state) => state.user);
    const {comments, loading: commentsLoading, error: commentsError} = useAppSelector((state) => state.comments);

    useEffect(() => {
        dispatch(loadUser(post.userId));
    }, [dispatch, post.userId]);

    useEffect(() => {
        if (showComments) {
            dispatch(loadComments(post.id));
        };
    }, [showComments, dispatch, post.id]);

    return (
        <div className={styles.postDetail}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postBody}>{post.body}</p>

            <UserInfo user={user} loading={userLoading} error={userError}/>

            <button onClick={() => setShowComments(!showComments)} className={styles.commentButton}>
                {showComments ? 'Скрыть комментарии' : 'Показать комментарии'}
            </button>

            {showComments && (
                <CommentsList comments={comments} loading={commentsLoading} error={commentsError}/>
            )}
        </div>
    );
};