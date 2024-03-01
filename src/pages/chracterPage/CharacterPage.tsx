import React, { FC } from 'react';
import { useCharacterPage } from './logic/useCharacterPage';

const CharacterPage: FC = () => {
  const { charactersState } = useCharacterPage();

  return <></>;
};

export default CharacterPage;
