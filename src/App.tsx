import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import StudentsPage from './pages/StudentsPage';
import styles from './App.module.scss';

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
