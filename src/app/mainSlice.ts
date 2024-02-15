import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Courses, StudentData, StudentDataToAdded, Students } from './types';
import { DEFAULT_URL } from '../utils';
import axios from 'axios';

export type InitialState = {
  students: Students;
  courses: Courses;
  isLoading: boolean;
};

const initialState: InitialState = {
  students: [],
  courses: [],
  isLoading: false,
};

export const getStudents = createAsyncThunk<
  Students,
  undefined,
  { rejectValue: string }
>('test/getStudents', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(DEFAULT_URL + 'students');

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const getCourses = createAsyncThunk<
  Courses,
  undefined,
  { rejectValue: string }
>('test/getAcademicSubjects', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(DEFAULT_URL + 'courses');

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const addStudentData = createAsyncThunk<
  StudentData,
  StudentDataToAdded,
  { rejectValue: string }
>(
  'test/addStudentData',
  async (studentData: StudentDataToAdded, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        DEFAULT_URL + 'studentsData',
        studentData,
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server error!');
    }
  },
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getStudents.fulfilled,
        (state, action: PayloadAction<Students>) => {
          state.students = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCourses.fulfilled,
        (state, action: PayloadAction<Courses>) => {
          state.courses = action.payload;
          state.isLoading = false;
        },
      );
  },
});

// export const {} = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;
