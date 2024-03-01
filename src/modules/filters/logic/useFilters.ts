import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { Filters } from '../../../app/types';
import {
  filterCaracters,
  rickAndMortyState,
} from '../../../app/rickAndMprtySlice';

export const useFilters = () => {
  const charactersState = useAppSelector(rickAndMortyState);
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
  };

  useEffect(() => {
    dispatch(filterCaracters(filters));
  }, [nameForSearch, status, gender]);

  return {
    charactersState,
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
