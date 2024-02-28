import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  Characters,
  Courses,
  GetAllCharactersResponse,
  InfoPages,
  StudentData,
  StudentDataToAdded,
  Students,
  StudentsData,
} from './types';
import { BASE_LOCAL_API_URL } from '../utils';
import axios from 'axios';

export type InitialState = {
  students: Students;
  courses: Courses;
  isLoading: boolean;
  errorStudentName: boolean;
  errorCourses: boolean;
  errorGradesCount: boolean;
  errorGrades: boolean;
  studentsData: StudentData[];
  infoPages: InfoPages;
  characters: Characters;
};

const initialState: InitialState = {
  students: [],
  courses: [],
  isLoading: false,
  errorStudentName: false,
  errorCourses: false,
  errorGradesCount: false,
  errorGrades: false,
  studentsData: [],
  infoPages: {
    count: null,
    pages: null,
    next: '',
    prev: '',
  },
  characters: [],
};

export const getStudents = createAsyncThunk<
  Students,
  undefined,
  { rejectValue: string }
>('test/getStudents', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(BASE_LOCAL_API_URL + 'students');

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
    const { data } = await axios.get(BASE_LOCAL_API_URL + 'courses');

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const addStudentData = createAsyncThunk<
  StudentData,
  StudentDataToAdded,
  { rejectValue: string; state: RootState }
>(
  'test/addStudentData',
  async (studentData: StudentDataToAdded, { rejectWithValue, getState }) => {
    const state = getState().main;
    const newStudentsData = state.studentsData;
    let isUpdate = false;
    let studentDataId;

    for (let i = 0; i < newStudentsData.length; i++) {
      const element = newStudentsData[i];
      if (
        element.courseId === studentData.courseId &&
        element.studentId === studentData.studentId
      ) {
        isUpdate = true;
        studentDataId = element.id;
      }
    }

    try {
      if (isUpdate) {
        const { data } = await axios.put(
          BASE_LOCAL_API_URL + `studentsData/${studentDataId}`,
          studentData,
        );
        return data;
      }
      const { data } = await axios.post(
        BASE_LOCAL_API_URL + 'studentsData',
        studentData,
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server error!');
    }
  },
);

export const getStudentsData = createAsyncThunk<
  StudentsData,
  undefined,
  { rejectValue: string }
>('test/getStudentsData', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(BASE_LOCAL_API_URL + 'studentsData');
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const getCharactersFirstPage = createAsyncThunk<
  GetAllCharactersResponse,
  undefined,
  { rejectValue: string }
>('test/getCharactersFirstPage', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character`,
    );

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const getCharactersPage = createAsyncThunk<
  GetAllCharactersResponse,
  string,
  { rejectValue: string }
>('test/getCharactersPage', async (url: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(url);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const filterCaractersByName = createAsyncThunk<
  GetAllCharactersResponse,
  string,
  { rejectValue: string }
>('test/filterCaractersByName', async (name: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    showErrorStudentName: (state) => {
      state.errorStudentName = true;
    },
    hideErrorStudentName: (state) => {
      state.errorStudentName = false;
    },
    showErrorCourses: (state) => {
      state.errorCourses = true;
    },
    hideErrorCourses: (state) => {
      state.errorCourses = false;
    },
    showErrorGradesCount: (state) => {
      state.errorGradesCount = true;
    },
    hideErrorGradesCount: (state) => {
      state.errorGradesCount = false;
    },
    showErrorGrades: (state) => {
      state.errorGrades = true;
    },
    hideErrorGrades: (state) => {
      state.errorGrades = false;
    },
  },

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
      )
      .addCase(addStudentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStudentData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getStudentsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getStudentsData.fulfilled,
        (state, action: PayloadAction<StudentsData>) => {
          state.studentsData = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getCharactersFirstPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCharactersFirstPage.fulfilled,
        (state, action: PayloadAction<GetAllCharactersResponse>) => {
          state.infoPages = action.payload.info;
          state.characters = action.payload.results;
          state.isLoading = false;
        },
      )
      .addCase(getCharactersPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCharactersPage.fulfilled,
        (state, action: PayloadAction<GetAllCharactersResponse>) => {
          state.infoPages = action.payload.info;
          state.characters = action.payload.results;
          state.isLoading = false;
        },
      )
      .addCase(filterCaractersByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        filterCaractersByName.fulfilled,
        (state, action: PayloadAction<GetAllCharactersResponse>) => {
          state.infoPages = action.payload.info;
          state.characters = action.payload.results;
          state.isLoading = false;
        },
      );
  },
});

export const {
  showErrorStudentName,
  hideErrorStudentName,
  showErrorCourses,
  hideErrorCourses,
  showErrorGradesCount,
  hideErrorGradesCount,
  showErrorGrades,
  hideErrorGrades,
} = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;
