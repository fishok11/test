import React from 'react';
import styles from './Filters.module.scss';
import Input from '../../UI/input/Input';
import { useFilters } from './logic/useFilters';
import Dropdown from '../../UI/dropdown/Dropdown';
import DropdownItem from '../../UI/dropdown/DropdownItem';

const Filters = () => {
  const { state, nameForSearch, setNameForSearch, status, setStatus } =
    useFilters();
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
        <Dropdown placeholder={'Status'} value={status}>
          {['alive', 'dead', 'unknown'].map((status) => (
            <DropdownItem
              key={status}
              text={status}
              onClick={() => setStatus(status)}
            />
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default Filters;
