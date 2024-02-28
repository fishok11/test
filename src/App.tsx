import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Header from './components/header/Header';
import StudentsPage from './pages/StudentsPage';
import styles from './App.module.scss';
import InfoPage from './pages/InfoPage/InfoPage';
import { useAppSelector } from './app/hooks';
import { mainState } from './app/mainSlice';
import Loader from './UI/loader/Loader';

function App() {
  const state = useAppSelector(mainState);

  return (
    <>
      <Header />
      <div className={styles.main}>
        {state.isLoading && <Loader />}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/info" element={<InfoPage />} />
          {/* <Route path="/character/:characterId" element={<InfoPage />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
