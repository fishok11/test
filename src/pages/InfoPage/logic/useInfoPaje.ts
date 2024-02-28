import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { filterCaractersByName, mainState } from '../../../app/mainSlice';

export const useInfoPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [nameForSearch, setNameForSearch] = useState('');

  useEffect(() => {
    dispatch(filterCaractersByName(nameForSearch));
  }, [nameForSearch]);

  return {
    state,
    dispatch,
    nameForSearch,
    setNameForSearch,
  };
};
