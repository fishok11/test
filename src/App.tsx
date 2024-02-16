import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100%',
          height: 'max-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
