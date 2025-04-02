import {UserType} from '../../types';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchUser} from '../../requests/index.ts';

type UserStateType = {
    user: UserType | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserStateType = {
    user: null,
    loading: false,
    error: null,
};

export const loadUser = createAsyncThunk('user/loadUser', async (userId: number) => {
    return await fetchUser(userId);
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось загрузить пользователя';
            });
    },
});

export default userSlice.reducer;