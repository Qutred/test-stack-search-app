import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserQuestions } from './../../api/stackService';

export const fetchUserQuestions = createAsyncThunk(
  'userQuestions/fetchUserQuestions',
  async ({ userId, userName }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setUserData({ userId, userName }));
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
  userQuestions: [],
  userId: null,
  userName: null,
  loading: {
    status: 'idle',
    error: null,
  },
};

export const userQuestionsSlice = createSlice({
  name: 'userQuestions',
  initialState,
  reducers: {
    setUserData: (state, payload) => {
      state.userName = payload.userName;
      state.userId = payload.userId;
    },
  },
  extraReducers: {
    [fetchUserQuestions.pending]: (state, action) => {
      state.loading.status = 'loading';
      state.loading.error = null;
    },
    [fetchUserQuestions.fulfilled]: (state, action) => {
      state.loading.status = 'resolved';
      state.loading.error = null;
      state.userQuestions = action.payload;
    },
    [fetchUserQuestions.rejected]: (state, action) => {
      state.loading.status = 'rejected';
      state.loading.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = userQuestionsSlice.actions;

export const useUserQuestions = state => state.userQuestionsSlice.userQuestions;
export const useUserQuestionsLoading = state =>
  state.userQuestionsSlice.loading;

export default userQuestionsSlice.reducer;
