import {CommentType, PostType, UserType} from '../../types';
import {useEffect, useState} from 'react';
import {fetchComments, fetchUser} from '../../requests/index.ts';
import {CommentsList, UserInfo} from '../index.ts';

type PostDetailsPropsType = {
    post: PostType;
};

export function PostDetails({ post }: PostDetailsPropsType) {

    const [showComments, setShowComments] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [userError, setUserError] = useState<string | null>(null);

    const [comments, setComments] = useState<CommentType[] | null>(null);
    const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
    const [commentsError, setCommentsError] = useState<string | null>(null);

    function showCommentsButtonHandler () {
        setShowComments(!showComments);
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchUser(post.userId);
                setUser(data);
            } catch (err) {
                setUserError(err);
            } finally {
                setUserLoading(false);
            };
        };

        loadUser();
    }, [post.userId]);

    useEffect(() => {
        if (!showComments) return;

        const loadComments = async () => {
            try {
                setCommentsLoading(true);
                const data = await fetchComments(post.id)
                setComments(data);
            } catch (err) {
                setCommentsError(err);
            } finally {
                setCommentsLoading(false);
            };
        };

        loadComments();
    }, [showComments, post.id]);

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <UserInfo user={user} loading={userLoading} error={userError} />

            <button onClick={showCommentsButtonHandler}>
                {showComments ? 'Скрыть комментарии' : 'Показать комментарии'}
            </button>

            {showComments && (
                <CommentsList comments={comments} loading={commentsLoading} error={commentsError} />
            )}
        </div>
    );
};