import React, { FC } from 'react';
import CaracterCard from '../../components/characterCard/CharacterCard';
import Pagination from '../../UI/pagination/Pagination';
import styles from './InfoPage.module.scss';
import { useInfoPage } from './logic/useInfoPaje';
import Filters from '../../modules/filters/Filters';

const InfoPage: FC = () => {
  const { charactersState } = useInfoPage();

  if (charactersState.characters === undefined) return null;

  return (
    <div className={styles.layout}>
      <Filters />
      <div className={styles.charactersContainer}>
        {charactersState.characters.map((character) => (
          <CaracterCard
            key={character.id}
            id={character.id}
            image={character.image}
            name={character.name}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default InfoPage;
