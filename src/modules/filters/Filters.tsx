import React from 'react';
import styles from './Filters.module.scss';
import Input from '../../UI/input/Input';
import { useFilters } from './logic/useFilters';

const Filters = () => {
  const {
    state,
    nameForSearch,
    setNameForSearch,
    status,
    setStatus,
    open,
    setOpen,
  } = useFilters();
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.inputContainer}>
        <Input
          id={'search'}
          type={'search'}
          placeholder={'Search by name...'}
          value={nameForSearch}
          onChange={(e) => setNameForSearch(e.target.value)}
        />
      </div>
      <div className={styles.selectContainer}>
        <input
          className={styles.select}
          value={status !== '' ? status : 'Status'}
          onClick={() => setOpen(!open)}
          readOnly
        ></input>
        {open && (
          <div>
            <ul className={styles.selectItemsContainer}>
              {['alive', 'dead', 'unknown'].map((status) => (
                <li
                  key={status}
                  className={styles.selectItem}
                  onClick={() => (setStatus(status), setOpen(false))}
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
