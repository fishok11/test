import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  Character,
  Characters,
  Filters,
  GetAllCharactersResponse,
  InfoPages,
} from './types';
import axios from 'axios';

export type InitialState = {
  infoPages: InfoPages;
  characters: Characters;
  character: Character;
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
  character: {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
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
  { rejectValue: string }
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

export const getCharacter = createAsyncThunk<
  Character,
  string,
  { rejectValue: string }
>('test/getCharacter', async (characterId: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/${characterId}`,
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
      )
      .addCase(getCharacter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCharacter.fulfilled,
        (state, action: PayloadAction<Character>) => {
          state.character = action.payload;
          state.isLoading = false;
        },
      );
  },
});

export const { nextPage, prevPage } = rickAndMortySlice.actions;

export const rickAndMortyState = (state: RootState) => state.rickAndMorty;

export default rickAndMortySlice.reducer;
