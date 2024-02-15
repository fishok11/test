import React, { useState } from 'react';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addStudentData,
  getCourses,
  getStudents,
  mainState,
} from '../app/mainSlice';
import { Course, Student, StudentDataToAdded } from '../app/types';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(mainState);
  const [studentId, setStudentId] = useState<number>();
  const [courseId, setCourseId] = useState<number>();
  const [gradesCount, setGradesCount] = useState<number>(0);
  const [grades, setGrades] = useState<string>('');
  const [validMissedClasses, setValidMissedClasses] = useState<number>(0);
  const [invalidMissedClasses, setInvalidMissedClasses] = useState<number>(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [decision, setDecision] = useState('');
  const handleSubmit = () => {
    let decision = '';
    const gradesArr = grades.split('').map((i) => Number(i));
    const averageGradeСalculation =
      gradesArr.reduce((acc, num) => acc + num) / gradesCount;
    setAverageGrade(averageGradeСalculation);

    if (
      averageGradeСalculation >= 3 &&
      validMissedClasses <= 15 &&
      invalidMissedClasses <= 5
    ) {
      setDecision('Студент допущен к зачету');
      decision = 'Студент допущен к зачету';
    } else {
      setDecision('Студент не допущен к экзамену/зачету');
      decision = 'Студент не допущен к экзамену/зачету';
    }

    const studentData: StudentDataToAdded = {
      studentId: studentId,
      courseId: courseId,
      averageGrade: averageGradeСalculation,
      validMissedClasses: validMissedClasses,
      invalidMissedClasses: invalidMissedClasses,
      grades: gradesArr,
      decision: decision,
    };
    dispatch(addStudentData(studentData));
    console.log(studentData);
  };
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getCourses());
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
        defaultValue=""
        size="small"
        fullWidth
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
        value={gradesCount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGradesCount(parseInt(e.target.value))
        }
      />
      <TextField
        id="outlined-basic"
        label="Оценки"
        variant="outlined"
        size="small"
        fullWidth
        disabled={gradesCount === 0}
        inputProps={{ maxLength: gradesCount }}
        value={grades}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGrades(e.target.value)
        }
      />
      <TextField
        id="outlined-basic"
        label="Пропуски по уважительной причине в %"
        variant="outlined"
        size="small"
        fullWidth
        type="number"
        inputProps={{ maxLength: 3 }}
        value={validMissedClasses}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValidMissedClasses(parseInt(e.target.value))
        }
      />
      <TextField
        id="outlined-basic"
        label="Пропуски по неуважительной причине в %"
        variant="outlined"
        size="small"
        fullWidth
        type="number"
        inputProps={{ maxLength: 3 }}
        value={invalidMissedClasses}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInvalidMissedClasses(parseInt(e.target.value))
        }
      />
      <Button variant="contained" fullWidth onClick={() => handleSubmit()}>
        Расчитать
      </Button>

      <div>
        <p>Средний балл: {averageGrade}</p>
        <p>Решение: {decision}</p>
      </div>
    </Stack>
  );
};

export default HomePage;
