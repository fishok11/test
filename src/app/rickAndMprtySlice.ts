import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import {
  Characters,
  Filters,
  GetAllCharactersResponse,
  InfoPages,
} from './types';
import axios from 'axios';

export type InitialState = {
  infoPages: InfoPages;
  characters: Characters;
  currentPage: number;
  isLoading: boolean;
};

const initialState: InitialState = {
  infoPages: {
    count: null,
    pages: null,
    next: '',
    prev: '',
  },
  characters: [],
  currentPage: 1,
  isLoading: false,
};

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

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const filterCaracters = createAsyncThunk<
  GetAllCharactersResponse,
  Filters,
  { rejectValue: string; dispatch: AppDispatch }
>('test/filterCaracters', async (filters: Filters, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${filters.name}&status=${filters.status}&gender=${filters.gender}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const rickAndMortySlice = createSlice({
  name: 'rickAndMorty',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    prevPage: (state) => {
      state.currentPage = state.currentPage - 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCharactersFirstPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCharactersFirstPage.fulfilled,
        (state, action: PayloadAction<GetAllCharactersResponse>) => {
          state.infoPages = action.payload.info;
          state.characters = action.payload.results;
          state.currentPage = initialState.currentPage;
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
      .addCase(filterCaracters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        filterCaracters.fulfilled,
        (state, action: PayloadAction<GetAllCharactersResponse>) => {
          state.infoPages = action.payload.info;
          state.characters = action.payload.results;
          state.currentPage = initialState.currentPage;
          state.isLoading = false;
        },
      );
  },
});

export const { nextPage, prevPage } = rickAndMortySlice.actions;

export const rickAndMortyState = (state: RootState) => state.rickAndMorty;

export default rickAndMortySlice.reducer;
