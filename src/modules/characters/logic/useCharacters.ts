import { useAppSelector } from './../../../app/hooks';
import { rickAndMortyState } from '../../../app/rickAndMprtySlice';

export const useCharacters = () => {
  const charactersState = useAppSelector(rickAndMortyState);

  return {
    charactersState,
  };
};
