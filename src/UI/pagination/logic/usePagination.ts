import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  InitialState,
  getCharactersFirstPage,
  getCharactersPage,
  mainState,
} from '../../../app/mainSlice';

type PaginationData = {
  state: InitialState;
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

export const usePagination = (): PaginationData | null => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (state.infoPages.prev === null || state.infoPages.next === null)
    return null;

  useEffect(() => {
    dispatch(getCharactersFirstPage());
  }, []);

  const handlePrevPage = () => {
    dispatch(getCharactersPage(state.infoPages.prev));
  };

  const handleNextPage = () => {
    dispatch(getCharactersPage(state.infoPages.next));
  };

  return {
    state,
    currentPage,
    handlePrevPage,
    handleNextPage,
  };
};
