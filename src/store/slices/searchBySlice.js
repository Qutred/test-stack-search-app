import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataByTag, getUserQuestions } from '../../api/stackService';

/*  fetch data for choosed tag */
export const fetchDataByTag = createAsyncThunk(
  'searchBy/fetchUserQuestions',
  async (tagName, { rejectWithValue }) => {
    try {
      let response = await getDataByTag({ tag: tagName });

      if (response.status !== 200) {
        throw new Error('Some Server Error');
      }
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* fetch data for choosed user questions */
export const fetchUserQuestions = createAsyncThunk(
  'searchBy/fetchUserQuestions',
  async ({ userId }, { rejectWithValue }) => {
    try {
      let response = await getUserQuestions({ userId: userId });

      if (response.status !== 200) {
        throw new Error('Some Server Error');
      }
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  loading: {
    status: 'idle',
    error: null,
  },
};

export const searchBySlice = createSlice({
  name: 'searchBy',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDataByTag.pending]: (state, action) => {
      state.loading.status = 'loading';
      state.loading.error = null;
    },
    [fetchDataByTag.fulfilled]: (state, action) => {
      state.loading.status = 'resolved';
      state.loading.error = null;
      state.data = action.payload;
    },
    [fetchDataByTag.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },
  },
});

export const useSearchByData = state => state.searchBySlice.data;
export const useSearchByLoading = state => state.searchBySlice.loading;

export default searchBySlice.reducer;
