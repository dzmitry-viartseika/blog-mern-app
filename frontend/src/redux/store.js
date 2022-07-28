import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts-slice.js';
import { authReducer } from './slices/auth-slice.js';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        user: authReducer,
    }
});

export default store;
