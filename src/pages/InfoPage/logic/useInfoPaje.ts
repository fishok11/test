import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { mainState } from '../../../app/mainSlice';

export const useInfoPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  return {
    state,
    dispatch,
  };
};
