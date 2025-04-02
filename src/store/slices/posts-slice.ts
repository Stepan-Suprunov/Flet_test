import {PostType} from '../../types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchPosts} from '../../requests/index.ts';

type PostsStateType = {
    posts: PostType[];
    loading: boolean;
    error: string | null;
    selectedPost?: PostType | null;
};

const initialState: PostsStateType = {
    posts: [],
    loading: false,
    error: null,
};

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
    return await fetchPosts();
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        clearSelectedPost: (state) => {
            state.selectedPost = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить посты';
            });
    },
});

export const {selectPost, clearSelectedPost} = postsSlice.actions;
export default postsSlice.reducer;