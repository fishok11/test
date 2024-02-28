import React, { FC } from 'react';
import styles from './Search.module.scss';

const Search: FC = () => {
  return <input className={styles.container} placeholder="Search..."></input>;
};

export default Search;
