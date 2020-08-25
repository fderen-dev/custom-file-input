import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExamplarySliceState {
  header: string;
}

const examplaryInitialState: ExamplarySliceState = {
  header: 'React typescript sandbox',
};

const examplarySlice = createSlice({
  name: 'example',
  initialState: examplaryInitialState,
  reducers: {
    setHeader(state, action: PayloadAction<string>) {
      state.header = action.payload;
    },
  },
});

export const { setHeader } = examplarySlice.actions;

const rootReducer = combineReducers({
  example: examplarySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
