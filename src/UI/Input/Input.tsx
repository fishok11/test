import React, { FC } from 'react';
import styles from './Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  min: number;
  max: number;
  value: number | string | [];
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  label: string;
};

const Input: FC<Partial<InputProps>> = ({
  id,
  type,
  placeholder,
  min,
  max,
  value,
  onChange,
  label,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      >
        {/* <div id="dropdown" className={styles.dropdown}>
          <ul className={styles.list} aria-labelledby="dropdown-button">
            <li>
              <a href="#" className={styles.itemList}>
                Shopping
              </a>
            </li>
            <li>
              <a href="#" className={styles.itemList}>
                Images
              </a>
            </li>
            <li>
              <a href="#" className={styles.itemList}>
                News
              </a>
            </li>
          </ul>
        </div> */}
      </input>
    </div>
  );
};

export default Input;
