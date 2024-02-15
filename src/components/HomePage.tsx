import React from 'react';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAcademicSubjects, getStudents, mainState } from '../app/mainSlice';
import { AcademicSubject, Student } from '../app/types';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(mainState);
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getAcademicSubjects());
  }, [dispatch]);

  return (
    <Stack
      spacing={2}
      sx={{
        width: '450px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        m: 'auto',
        height: '100%',
      }}
    >
      <TextField
        id="outlined-select-currency"
        select
        label="Выберите студента"
        defaultValue=""
        size="small"
        fullWidth
      >
        {state.students?.map((item: Student) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-currency"
        select
        label="Выберите предмет"
        defaultValue=""
        size="small"
        fullWidth
      >
        {state.academicSubjects?.map((item: AcademicSubject) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-basic"
        label="Оценки"
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Пропуски"
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button variant="contained" fullWidth>
        Расчитать
      </Button>
    </Stack>
  );
};

export default HomePage;
