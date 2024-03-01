import {
  getCharacter,
  rickAndMortyState,
} from '../../../app/rickAndMortySlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

export const useCharacterPage = () => {
  const charactersState = useAppSelector(rickAndMortyState);
  const dispatch = useAppDispatch();
  const { characterId } = useParams();

  useEffect(() => {
    if (characterId) dispatch(getCharacter(characterId));
  }, [characterId]);

  return { charactersState };
};
