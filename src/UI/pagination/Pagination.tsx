import React, { FC } from 'react';
import { usePagination } from './logic/usePagination';
import styles from './Pagination.module.scss';

const Pagination: FC = () => {
  const { state, currentPage, handleNextPage, handlePrevPage } =
    usePagination();

  return (
    <>
      <ul className={styles.container}>
        <li className={styles.itemPrev} onClick={handlePrevPage}>
          Prev
        </li>
        {/* <li className={styles.item}>{currentPage}</li> */}
 
        <li className={styles.itemNext} onClick={handleNextPage}>
          Next
        </li>
      </ul>
    </>
  );
};

export default Pagination;
