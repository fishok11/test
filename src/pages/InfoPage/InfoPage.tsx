import React, { FC } from 'react';
import CaracterCard from '../../components/characterCard/CharacterCard';
import Pagination from '../../UI/pagination/Pagination';
import styles from './InfoPage.module.scss';
import Input from '../../UI/input/Input';
import { useInfoPage } from './logic/useInfoPaje';

const InfoPage: FC = () => {
  const { state, nameForSearch, setNameForSearch } = useInfoPage();

  if (state.characters === undefined) return null;

  return (
    <div className={styles.layout}>
      <div className={styles.searchContainer}>
        <Input
          id={'search'}
          type={'search'}
          placeholder={'Search by name...'}
          value={nameForSearch}
          onChange={(e) => setNameForSearch(e.target.value)}
        />
      </div>
      <div className={styles.charactersContainer}>
        {state.characters.map((character) => (
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
