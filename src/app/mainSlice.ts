import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { AcademicSubjects, Students } from './types';
import { DEFAULT_URL } from '../utils';
import axios from 'axios';

export type InitialState = {
  students: Students;
  academicSubjects: AcademicSubjects;
  isLoading: Boolean;
}

const initialState: InitialState = {
  students: [],
  academicSubjects: [],
  isLoading: false,
};

export const getStudents = createAsyncThunk<Students, undefined, {rejectValue: string}>(
  'test/getStudents',
  async (_, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(DEFAULT_URL + 'students');

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server error!');
    }
  }
);

export const getAcademicSubjects = createAsyncThunk<AcademicSubjects, undefined, {rejectValue: string}>(
  'test/getAcademicSubjects',
  async (_, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(DEFAULT_URL + 'academicSubjects');

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server error!');
    }
  }
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action: PayloadAction<Students>) => {
        state.students = action.payload;
        state.isLoading = false;
      })
      .addCase(getAcademicSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcademicSubjects.fulfilled, (state, action: PayloadAction<AcademicSubjects>) => {
        state.academicSubjects = action.payload;
        state.isLoading = false;
      })
  },
});

export const {  } = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;