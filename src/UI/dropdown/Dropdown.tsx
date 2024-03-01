import React, { FC } from 'react';
import styles from './Dropdown.module.scss';
import { useDropdown } from './logic/useDropdown';

type DropdownProps = {
  label: string;
  placeholder: string;
  value: number | string | undefined;
  children: React.ReactNode;
  error: boolean;
  helperText: string;
};

const Dropdown: FC<Partial<DropdownProps>> = ({
  label,
  placeholder,
  value,
  children,
  error,
  helperText,
}) => {
  const { open, setOpen, dropdownRef } = useDropdown();

  return (
    <div className={styles.container} ref={dropdownRef}>
      <label htmlFor={placeholder} className={styles.label}>
        {label}
      </label>
      <input
        id={placeholder}
        placeholder={placeholder}
        className={error ? styles.selectError : styles.select}
        value={value}
        onClick={() => setOpen(!open)}
        readOnly
      />
      {open && (
        <div onClick={() => setOpen(false)}>
          <ul className={styles.selectItemsContainer}>{children}</ul>
        </div>
      )}
      {error && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default Dropdown;
