import React, { FC } from 'react';
import { useCharacters } from './logic/useCharacters';
import CharacterCard from '../../components/characterCard/CharacterCard';
import styles from './Characters.module.scss';

const Caracters: FC = () => {
  const { charactersState } = useCharacters();

  return (
    <div className={styles.charactersContainer}>
      {charactersState.characters?.map((character) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          image={character.image}
          name={character.name}
        />
      ))}
    </div>
  );
};

export default Caracters;
