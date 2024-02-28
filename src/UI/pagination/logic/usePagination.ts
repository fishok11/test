import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCharactersFirstPage,
  getCharactersPage,
  mainState,
} from '../../../app/mainSlice';

export const usePagination = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getCharactersFirstPage());
  }, []);

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
    dispatch(getCharactersPage(state.infoPages.prev));
  };

  const handleNextPage = () => {
    if (currentPage === state.infoPages.pages) return;
    setCurrentPage((prevPage) => prevPage + 1);
    dispatch(getCharactersPage(state.infoPages.next));
  };

  return {
    state,
    currentPage,
    handlePrevPage,
    handleNextPage,
  };
};
