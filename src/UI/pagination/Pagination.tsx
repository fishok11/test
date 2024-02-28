import React, { FC } from 'react';
import { usePagination } from './logic/usePagination';
import styles from './Pagination.module.scss';

const Pagination: FC = () => {
  const {state, currentPage, handleNextPage, handlePrevPage} = usePagination();
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
