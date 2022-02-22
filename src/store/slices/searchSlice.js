import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { seachByQuery } from './../../api/stackService';

export const fetchQuestions = createAsyncThunk(
  'search/fetchQuestions',
  async ({ intitle, page, pagesize }, { rejectWithValue }) => {
    debugger;
    try {
      let response = await seachByQuery({ intitle, page, pagesize });
      debugger;
      if (response.status !== 200) {
        throw new Error('Some Server Error');
      }
      return {
        items: response.data.items,
        total: response.data.total,
        has_more: response.data.has_more,
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.error_message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchResults: {
    items: [],
    total: null,
    has_more: null,
  },
  loading: {
    status: 'idle',
    error: null,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchQuestions.pending]: (state, action) => {
      state.loading.status = 'loading';
      state.loading.error = null;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading.status = 'resolved';
      state.loading.error = null;
      state.searchResults = action.payload;
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = searchSlice.actions;

export const useSearchResults = state => state.searchSlice.searchResults;
export const useSearchLoading = state => state.searchSlice.loading;

export default searchSlice.reducer;
