import React, { FC } from 'react';
import styles from './Dropdown.module.scss';

type DropdownItemProps = {
  text: string;
  onClick: () => void;
};

const DropdownItem: FC<DropdownItemProps> = ({ text, onClick }) => {
  return (
    <li className={styles.selectItem} onClick={onClick}>
      {text}
    </li>
  );
};

export default DropdownItem;
