import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { mainState } from '../../app/mainSlice';
import CaracterCard from '../../components/characterCard/CharacterCard';
import Pagination from '../../UI/pagination/Pagination';
import styles from './InfoPage.module.scss';
import Search from '../../UI/search/Search';

const InfoPage: FC = () => {
  const state = useAppSelector(mainState);

  if (state.characters === undefined) return null;

  return (
    <div className={styles.layout}>
      <Search />
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
      <Pagination />
    </div>
  );
};

export default InfoPage;
