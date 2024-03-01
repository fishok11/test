import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Header from './components/header/Header';
import StudentsPage from './pages/studentsPage/StudentsPage';
import styles from './App.module.scss';
import InfoPage from './pages/InfoPage/InfoPage';
import { useAppSelector } from './app/hooks';
import { mainState } from './app/mainSlice';
import { rickAndMortyState } from './app/rickAndMortySlice';
import Loader from './UI/loader/Loader';
import CharacterPage from './pages/chracterPage/CharacterPage';

function App() {
  const state = useAppSelector(mainState);
  const charactersState = useAppSelector(rickAndMortyState);

  return (
    <>
      <Header />
      <div className={styles.main}>
        {(state.isLoading || charactersState.isLoading) && (<Loader />)}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route
            path="/info/character/:characterId"
            element={<CharacterPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
