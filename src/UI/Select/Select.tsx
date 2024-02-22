import React, { FC } from 'react';
import styles from './Select.module.scss';

type SelectProps = {
  label: string;
  children: React.ReactNode;
  value: number | string | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
};

const Select: FC<SelectProps> = ({ children, label, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="cars" className={styles.label}>
        {label}
      </label>
      <select
        id="cars"
        name="cars"
        className={styles.select}
        // defaultValue={''}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
