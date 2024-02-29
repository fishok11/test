import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { filterCaractersByName, mainState } from '../../../app/mainSlice';

export const useFilters = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [nameForSearch, setNameForSearch] = useState('');
  const [status, setStatus] = useState(''); 
  const [open, setOpen] = useState(false);

  const filters = {
    nameForSearch,
    status,
  };

  useEffect(() => {
    dispatch(filterCaractersByName(nameForSearch));
  }, [nameForSearch]);

  return {
    state,
    dispatch,
    nameForSearch,
    setNameForSearch,
    status,
    setStatus,
    open,
    setOpen,
  };
};
