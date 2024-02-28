import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCharactersPage, mainState } from '../../app/mainSlice';
import styles from './Pagination.module.scss';

const Pagination: FC = () => {
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

  if (state.infoPages === null) return null;
  return (
    <>
      <ul className={styles.container}>
        <li className={styles.itemPrev} onClick={handlePrevPage}>
          Prev
        </li>
        <li className={styles.item} onClick={handlePrevPage}>
          1
        </li>
        <li className={styles.item} onClick={handlePrevPage}>
          ...
        </li>
        <li className={styles.item} onClick={handlePrevPage}>
          {currentPage}
        </li>
        <li className={styles.item} onClick={handlePrevPage}>
          ...
        </li>
        <li className={styles.item} onClick={handlePrevPage}>
          {state.infoPages.pages}
        </li>
        <li className={styles.itemNext} onClick={handleNextPage}>
          Next
        </li>
      </ul>
    </>
  );
};

export default Pagination;
