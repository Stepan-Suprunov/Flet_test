import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './slices/posts-slice.ts'
import commentReducer from './slices/comments-slice.ts'
import userReducer from './slices/user-slice.ts'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentReducer,
        user: userReducer,
    },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;