import React, { FC } from 'react';
import styles from './CharacterCard.module.scss';
import { Link } from 'react-router-dom';

type CharacterCardProps = {
  id: number;
  name: string;
  image: string;
  url: string;
};

const CharacterCard: FC<CharacterCardProps> = ({ id, name, image, url }) => {
  return (
    <div className={styles.container}>
      <Link to={`/info/character/${id}`}>
        <img src={image} alt={image} className={styles.img} />
        <div className={styles.infoContainer}>
          <p className={styles.text}>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
