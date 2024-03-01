import React, { FC } from 'react';
import Pagination from '../../UI/pagination/Pagination';
import styles from './InfoPage.module.scss';
import Filters from '../../modules/filters/Filters';
import Caracters from '../../modules/characters/Characters';

const InfoPage: FC = () => {
  return (
    <div className={styles.layout}>
      <Filters />
      <Caracters />
      <Pagination />
    </div>
  );
};

export default InfoPage;
