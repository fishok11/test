import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';
import rickAndMortyReducer from './rickAndMortySlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    rickAndMorty: rickAndMortyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
