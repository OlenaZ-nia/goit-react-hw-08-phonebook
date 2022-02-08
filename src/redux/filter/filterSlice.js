import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        updateFilter: (_, { payload }) => payload,
        resetFilter: (_, {payload})=>payload,
    },
})

export const { updateFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;