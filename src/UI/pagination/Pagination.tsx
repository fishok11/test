import React, { FC } from 'react';
import { usePagination } from './logic/usePagination';
import styles from './Pagination.module.scss';

const Pagination: FC = () => {
  const { state, handleNextPage, handlePrevPage } =
    usePagination();

  return (
    <>
      <p className={styles.text}>
        <span className={styles.textPage}>{state.currentPage}</span> out of{' '}
        <span className={styles.textPage}>{state.infoPages.pages}</span>
      </p>
      <div className={styles.buttonsContainer}>
        <button className={styles.itemPrev} onClick={handlePrevPage}>
          Prev
        </button>
        <button className={styles.itemNext} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
