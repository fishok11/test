import { useAppSelector } from './../../../app/hooks';
import { rickAndMortyState } from '../../../app/rickAndMortySlice';

export const useCharacters = () => {
  const charactersState = useAppSelector(rickAndMortyState);

  return {
    charactersState,
  };
};
