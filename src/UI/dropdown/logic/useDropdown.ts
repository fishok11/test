import { useState } from 'react';
import styles from './Dropdown.module.scss';

export const useDropdown = () => {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
  };
};