import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header/Header';
import { Container } from '@mui/material';
import StudentsPage from './components/StudentsPage';

function App() {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '80%',
          height: 'max-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
