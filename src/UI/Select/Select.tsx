import React, { FC } from 'react';
import styles from './Select.module.scss';

type SelectProps = {
  label: string;
  children: React.ReactNode;
  value: number | string | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  error: boolean;
  helperText: string;
};

const Select: FC<SelectProps> = ({
  children,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="cars" className={styles.label}>
        {label}
      </label>
      <select
        id="cars"
        name="cars"
        className={error ? styles.selectError : styles.select}
        defaultValue={''}
        value={value}
        onChange={onChange}
      >
        <option className="hidden"></option>
        {children}
      </select>
      {error && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default Select;
