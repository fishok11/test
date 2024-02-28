import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getCharactersPage, mainState } from '../../../app/mainSlice';

export const usePagination = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getCharactersPage(currentPage));
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return {
    state,
    currentPage,
    handlePrevPage,
    handleNextPage
  };
};
