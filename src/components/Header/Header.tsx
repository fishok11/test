import React, { FC } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.linkContainer}>
        <Link to={'/'} className={styles.link}>
          Home
        </Link>
        <Link to={'/students'} className={styles.link}>
          Students
        </Link>
        <Link to={'/info'} className={styles.link}>
          Info
        </Link>
      </div>
    </header>
  );
};

export default Header;
