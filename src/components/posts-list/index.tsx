import {useEffect} from 'react';
import {PostType} from '../../types';
import {Loader, PostDetails} from '../index.ts';
import styles from './style.module.css'
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {clearSelectedPost, loadPosts, selectPost} from '../../store/slices/posts-slice.ts';

export function PostsList () {

    const dispatch = useAppDispatch();
    const { posts, loading, error, selectedPost } = useAppSelector((state) => state.posts)

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    if (!posts) return null;

    return (
        <div>
            {selectedPost ? (
                <div>
                    <button
                        className={styles.backButton}
                        onClick={() => dispatch(clearSelectedPost())}
                    >
                        Вернуться к списку постов
                    </button>
                    <PostDetails post={selectedPost} />
                </div>
            ) : (
                <ul className={styles.list}>
                    {posts.map((post: PostType) => (
                        <li
                            key={post.id}
                            className={styles.listItem}
                            onClick={() => dispatch(selectPost(post))}
                        >
                            <h3 className={styles.postTitle}>{post.title}</h3>
                            <p className={styles.postBody}>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};