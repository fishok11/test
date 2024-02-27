import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllCharacters, mainState } from '../../app/mainSlice';
import CaracterCard from '../../components/characterCard/CharacterCard';
import styles from './InfoPage.module.scss';

const InfoPage: FC = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCharacters());
  }, []);

  return (
    <div className={styles.container}>
      {state.characters.map((character) => (
        <CaracterCard
          key={character.id}
          id={character.id}
          image={character.image}
          name={character.name}
          url={character.url}
        />
      ))}
    </div>
  );
};

export default InfoPage;
