import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/api.js';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

const initialState = {
    user: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.user = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.user = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.user = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.user = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.user = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.user = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
    },
});

export const selectIsAuth = (state) => Boolean(state.auth);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
