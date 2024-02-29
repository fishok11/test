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
}) => {
  const { open, setOpen } = useDropdown();
  return (
    <>
      <label htmlFor={placeholder} className={styles.label}>
        {label}
      </label>
      <input
        id={placeholder}
        placeholder={placeholder}
        className={styles.select}
        value={value}
        onClick={() => setOpen(!open)}
        readOnly
      />
      {open && (
        <div>
          <ul className={styles.selectItemsContainer}>{children}</ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
