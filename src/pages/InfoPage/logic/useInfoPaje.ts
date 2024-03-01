import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { rickAndMortyState } from '../../../app/rickAndMprtySlice';

export const useInfoPage = () => {
  const charactersState = useAppSelector(rickAndMortyState);
  const dispatch = useAppDispatch();

  return {
    charactersState,
    dispatch,
  };
};
