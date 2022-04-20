import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchOnwers: []
};

export const searchSlide = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearchOwners: (state, action) => {
            state.searchOnwers = action.payload;
        },
        resetSearchOwenrs: (state) => {
            state.searchOnwers = [];
        }
    }
});

export const { addSearchOwners, resetSearchOwenrs } = searchSlide.actions;


export const selectSearchOwners = (state) => state.search.searchOnwers;

export default searchSlide.reducer;
