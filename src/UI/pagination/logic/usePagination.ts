import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCharactersFirstPage,
  getCharactersPage,
  nextPage,
  prevPage,
  rickAndMortyState,
} from '../../../app/rickAndMortySlice';

export const usePagination = () => {
  const charactersState = useAppSelector(rickAndMortyState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharactersFirstPage());
  }, []);

  const scrollUp = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollBy(0, -50);
      setTimeout(scrollUp, 10);
    }
  };

  const handlePrevPage = () => {
    dispatch(prevPage());
    if (charactersState.infoPages.prev) {
      dispatch(getCharactersPage(charactersState.infoPages.prev));
    }
    scrollUp();
  };

  const handleNextPage = () => {
    dispatch(nextPage());
    if (charactersState.infoPages.next) {
      dispatch(getCharactersPage(charactersState.infoPages.next));
    }
    scrollUp();
  };

  return {
    charactersState,
    handlePrevPage,
    handleNextPage,
  };
};
