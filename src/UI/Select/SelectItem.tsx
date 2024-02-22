import React, { FC } from 'react';

type SelectItemProps = {
  value: string | number;
  content: string;
};

const SelectItem: FC<SelectItemProps> = ({ value, content }) => {
  return <option value={value}>{content}</option>;
};

export default SelectItem;
