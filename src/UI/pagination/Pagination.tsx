import React, { FC } from 'react';
import { usePagination } from './logic/usePagination';
import styles from './Pagination.module.scss';

const Pagination: FC = () => {
  const { state, currentPage, handleNextPage, handlePrevPage } =
    usePagination();

  return (
    <>
      <p className={styles.text}>
        <span className={styles.textPage}>{currentPage}</span> out of{' '}
        <span className={styles.textPage}>{state.infoPages.pages}</span>
      </p>
      <ul className={styles.buttonsContainer}>
        <li className={styles.itemPrev} onClick={handlePrevPage}>
          Prev
        </li>
        <li className={styles.itemNext} onClick={handleNextPage}>
          Next
        </li>
      </ul>
    </>
  );
};

export default Pagination;
