import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts-slice.js';

const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
});

export default store;
