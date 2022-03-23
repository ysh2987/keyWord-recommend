import { createSlice } from '@reduxjs/toolkit';
import fetchSearchKeword from './searchThunk';

const initialState = {
  error: false,
  isLoading: false,
  data: null,
};

const searchSlice = createSlice({
  name: 'searchKeword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchKeword.pending, (state) => {
      state.error = false;
      state.isLoading = true;
      state.data = [];
    });
    builder.addCase(fetchSearchKeword.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSearchKeword, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default searchSlice.reducer;
