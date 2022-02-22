import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataByTag, getUserQuestions } from '../../api/stackService';

/*  fetch data for choosed tag */
export const fetchDataByTag = createAsyncThunk(
  'searchBy/fetchUserQuestions',
  async ({ tag, page, pagesize }, { rejectWithValue }) => {
    try {
      let response = await getDataByTag({ tag, page, pagesize });

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

/* fetch data for choosed user questions */
export const fetchUserQuestions = createAsyncThunk(
  'searchBy/fetchUserQuestions',
  async ({ userId, page, pagesize }, { rejectWithValue }) => {
    try {
      let response = await getUserQuestions({ userId: userId, page, pagesize });

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
  data: {
    items: [],
    total: null,
    has_more: null,
  },
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
