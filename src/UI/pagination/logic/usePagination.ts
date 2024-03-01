import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCharactersFirstPage,
  getCharactersPage,
  nextPage,
  prevPage,
  rickAndMortyState,
} from '../../../app/rickAndMprtySlice';

export const usePagination = () => {
  const charactersState = useAppSelector(rickAndMortyState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharactersFirstPage());
  }, []);

  const handlePrevPage = () => {
    if (charactersState.currentPage === 1) return;
    dispatch(prevPage());
    if (charactersState.infoPages.prev) {
      dispatch(getCharactersPage(charactersState.infoPages.prev));
    }
  };

  const handleNextPage = () => {
    if (charactersState.currentPage === charactersState.infoPages.pages) return;
    dispatch(nextPage());
    if (charactersState.infoPages.next) {
      dispatch(getCharactersPage(charactersState.infoPages.next));
    }
  };

  return {
    charactersState,
    handlePrevPage,
    handleNextPage,
  };
};
