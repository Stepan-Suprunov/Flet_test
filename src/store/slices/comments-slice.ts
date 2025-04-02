import {CommentType} from '../../types';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchComments} from '../../requests/index.ts';

type CommentsStateType = {
    comments: CommentType[];
    loading: boolean;
    error: string | null;
};
const initialState: CommentsStateType = {
    comments: [],
    loading: false,
    error: null,
};

export const loadComments = createAsyncThunk('comments/loadComments', async (postId: number) => {
    return await fetchComments(postId);
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(loadComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить комментарии';
            });
    },
});

export default commentsSlice.reducer;