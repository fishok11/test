import React, { useState } from 'react';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addStudentData,
  getCourses,
  getStudentsData,
  getStudents,
  hideErrorCourses,
  hideErrorGrades,
  hideErrorGradesCount,
  hideErrorStudentName,
  mainState,
  showErrorCourses,
  showErrorGrades,
  showErrorGradesCount,
  showErrorStudentName,
} from '../app/mainSlice';
import { Course, Student, StudentDataToAdded } from '../app/types';
import ModalDesision from './ModalDecision';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(mainState);
  const [studentId, setStudentId] = useState<number>();
  const [courseId, setCourseId] = useState<number>();
  const [gradesCount, setGradesCount] = useState<number>(0);
  const [grades, setGrades] = useState<number[]>([]);
  const [quanityValidMissedClasses, setQuanityValidMissedClasses] =
    useState<number>(0);
  const [quanityInvalidMissedClasses, setQuanityInvalidMissedClasses] =
    useState<number>(0);
  const [averageGrade, setAverageGrade] = useState<number>();
  const [decision, setDecision] = useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const handleSubmit = () => {
    if (
      studentId === undefined ||
      courseId === undefined ||
      gradesCount === 0 ||
      grades.length === 0
    ) {
      if (studentId === undefined) {
        dispatch(showErrorStudentName());
      }
      if (courseId === undefined) {
        dispatch(showErrorCourses());
      }
      if (gradesCount === 0) {
        dispatch(showErrorGrades());
      }
      if (grades.length === 0) {
        dispatch(showErrorGradesCount());
      }
      return;
    }

    let decision = '';
    const averageGradeСalculation =
      grades.reduce((acc, num) => acc + num) / gradesCount;
    setAverageGrade(averageGradeСalculation);
    const percentValidMissedClasses =
      (quanityValidMissedClasses /
        (gradesCount +
          quanityValidMissedClasses +
          quanityInvalidMissedClasses)) *
      100;
    const percentInvalidMissedClasses =
      (quanityInvalidMissedClasses /
        (gradesCount +
          quanityValidMissedClasses +
          quanityInvalidMissedClasses)) *
      100;

    if (
      averageGradeСalculation >= 3 &&
      percentValidMissedClasses <= 30 &&
      percentInvalidMissedClasses <= 30
    ) {
      decision = 'Зачет';
      setDecision(decision);
    } else {
      decision = 'Незачет';
      setDecision(decision);
    }

    const studentData: StudentDataToAdded = {
      studentId: studentId,
      courseId: courseId,
      averageGrade: averageGradeСalculation,
      validMissedClasses: quanityValidMissedClasses,
      invalidMissedClasses: quanityInvalidMissedClasses,
      grades: grades,
      decision: decision,
    };
    dispatch(addStudentData(studentData));
    dispatch(hideErrorStudentName());
    dispatch(hideErrorGradesCount());
    dispatch(hideErrorGrades());
    dispatch(hideErrorCourses());
    setOpenModal(true);
  };
  const handleGradeChange = (index: number, value: number) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getCourses());
    dispatch(getStudentsData());
  }, [dispatch, openModal]);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          width: '450px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          m: 'auto',
          pt: '30px',
        }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Выберите студента"
          size="small"
          fullWidth
          defaultValue=""
          error={state.errorStudentName}
          helperText={state.errorStudentName ? 'Обязательное поле' : ''}
          onChange={(e) => setStudentId(parseInt(e.target.value))}
        >
          {state.students?.map((item: Student) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Выберите предмет"
          size="small"
          fullWidth
          defaultValue=""
          error={state.errorCourses}
          helperText={state.errorCourses ? 'Обязательное поле' : ''}
          onChange={(e) => setCourseId(parseInt(e.target.value))}
        >
          {state.courses?.map((item: Course) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="Количество оценок"
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          inputProps={{ min: 0 }}
          error={state.errorGradesCount}
          helperText={state.errorGradesCount ? 'Обязательное поле' : ''}
          value={gradesCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGradesCount(parseInt(e.target.value))
          }
        />
        {Array.from({ length: gradesCount }).map((_, index) => (
          <TextField
            id="outlined-basic"
            label="Оценка"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            key={index}
            inputProps={{ min: 0, max: 5 }}
            error={state.errorGrades}
            helperText={state.errorGrades ? 'Обязательное поле' : ''}
            defaultValue={0}
            value={grades[index]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleGradeChange(index, parseInt(e.target.value))
            }
          />
        ))}
        <TextField
          id="outlined-basic"
          label="Пропуски по уважительной причине"
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          inputProps={{ min: 0 }}
          value={quanityValidMissedClasses}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuanityValidMissedClasses(parseInt(e.target.value))
          }
        />
        <TextField
          id="outlined-basic"
          label="Пропуски по неуважительной причине"
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          inputProps={{ min: 0 }}
          value={quanityInvalidMissedClasses}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuanityInvalidMissedClasses(parseInt(e.target.value))
          }
        />
        <Button variant="contained" fullWidth onClick={() => handleSubmit()}>
          Расчитать
        </Button>
      </Stack>
      <ModalDesision
        openModal={openModal}
        setOpenModal={setOpenModal}
        averageGrade={averageGrade}
        decision={decision}
      />
    </>
  );
};

export default HomePage;
