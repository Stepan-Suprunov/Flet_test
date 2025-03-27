import {useEffect, useState} from 'react';
import {PostType} from '../../types';
import {fetchPosts} from '../../requests/index.ts';
import {Loader, PostDetails} from '../index.ts';

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
                setError(err);
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
                    <button onClick={backToPostsButtonHandler}>Назад</button>
                    <PostDetails post={selectedPost} />
                </div>
            ) : (
                <ul>
                    {posts.map((post: PostType) => (
                        <li key={post.id} onClick={() => onPostClickHandler(post)}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};