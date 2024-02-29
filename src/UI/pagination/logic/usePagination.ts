import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCharactersFirstPage,
  getCharactersPage,
  mainState,
  nextPage,
  prevPage,
} from '../../../app/mainSlice';

export const usePagination = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getCharactersFirstPage());
  }, []);

  const handlePrevPage = () => {
    if (state.currentPage === 1) return;
    dispatch(prevPage());
    dispatch(getCharactersPage(state.infoPages.prev));
  };

  const handleNextPage = () => {
    if (state.currentPage === state.infoPages.pages) return;
    dispatch(nextPage());
    dispatch(getCharactersPage(state.infoPages.next));
  };

  return {
    state,
    handlePrevPage,
    handleNextPage,
  };
};
