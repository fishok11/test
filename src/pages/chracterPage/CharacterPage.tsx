import React, { FC } from 'react';
import { useCharacterPage } from './logic/useCharacterPage';
import styles from './Character.module.scss';

const CharacterPage: FC = () => {
  const { charactersState } = useCharacterPage();

  if (charactersState.isLoading === true) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{charactersState.character.name}</h1>
      <div className={styles.infoContainer}>
        <img
          className={styles.image}
          src={charactersState.character.image}
          alt={charactersState.character.image}
        />
        <div className={styles.textContainer}>
          <p className={styles.text}>
            <span>Species:</span> {charactersState.character.species}
          </p>
          <p className={styles.text}>
            <span>Gender:</span> {charactersState.character.gender}
          </p>
          {charactersState.character.type !== '' && (
            <p className={styles.text}>
              <span>Type:</span> {charactersState.character.type}
            </p>
          )}
          <p className={styles.text}>
            <span>Status:</span> {charactersState.character.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
