import {useEffect, useState} from 'react';
import {PostType} from '../../types';
import {fetchPosts} from '../../requests/index.ts';
import {Loader, PostDetails} from '../index.ts';
import styles from './style.module.css'

export function PostsList () {

    const [posts, setPosts] = useState<PostType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

    function backToPostsButtonHandler () {
        setSelectedPost(null);
    };

    function onPostClickHandler (post: PostType) {
        setSelectedPost(post);
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load Posts');
            } finally {
                setLoading(false);
            };
        };

        loadPosts();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    if (!posts) return null;

    return (
        <div>
            {selectedPost ? (
                <div>
                    <button
                        className={styles.backButton}
                        onClick={backToPostsButtonHandler}
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
                            onClick={() => onPostClickHandler(post)}
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