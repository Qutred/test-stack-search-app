import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataByTag } from './../../api/stackService';

export const fetchDataByTag = createAsyncThunk(
  'tagData/fetchUserQuestions',
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

const initialState = {
  tagData: [],
  loading: {
    status: 'idle',
    error: null,
  },
};

export const tagDataSlice = createSlice({
  name: 'tagData',
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
      state.tagData = action.payload;
    },
    [fetchDataByTag.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },
  },
});

export const useTagData = state => state.tagDataSlice.tagData;
export const useTagDataLoading = state => state.tagDataSlice.loading;

export default tagDataSlice.reducer;
