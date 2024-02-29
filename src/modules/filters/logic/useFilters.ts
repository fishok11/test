import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { filterCaractersByName, mainState } from '../../../app/mainSlice';
import { Filters } from '../../../app/types';

export const useFilters = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [nameForSearch, setNameForSearch] = useState('');
  const [status, setStatus] = useState('');
  const statuses = ['alive', 'dead', 'unknown'];
  const [gender, setGender] = useState('');
  const genders = ['female', 'male', 'genderless', 'unknown'];

  const filters: Filters = {
    name: nameForSearch,
    status: status,
    gender: gender,
  };

  const handleClear = () => {
    setNameForSearch('');
    setStatus('');
    setGender('');
  }

  useEffect(() => {
    dispatch(filterCaractersByName(filters));
  }, [nameForSearch, status, gender]);

  return {
    state,
    dispatch,
    nameForSearch,
    setNameForSearch,
    status,
    setStatus,
    statuses,
    gender,
    setGender,
    genders,
    handleClear,
  };
};
