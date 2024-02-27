import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Header from './components/Header/Header';
import StudentsPage from './pages/StudentsPage';
import styles from './App.module.scss';
import InfoPage from './pages/InfoPage/InfoPage';

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
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
