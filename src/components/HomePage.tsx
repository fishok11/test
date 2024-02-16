import React, { useState } from 'react';
import {
  Button,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addStudentData,
  getCourses,
  getStudentData,
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

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(mainState);
  const [studentId, setStudentId] = useState<number>();
  const [courseId, setCourseId] = useState<number>();
  const [gradesCount, setGradesCount] = useState<number>(0);
  const [grades, setGrades] = useState<number[]>([]);
  const [validMissedClasses, setValidMissedClasses] = useState<number>(0);
  const [invalidMissedClasses, setInvalidMissedClasses] = useState<number>(0);
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

    if (
      averageGradeСalculation >= 3 &&
      validMissedClasses <= 15 &&
      invalidMissedClasses <= 5
    ) {
      decision = 'Студент допущен к зачету';
      setDecision(decision);
    } else {
      decision = 'Студент не допущен к экзамену/зачету';
      setDecision(decision);
    }

    const studentData: StudentDataToAdded = {
      studentId: studentId,
      courseId: courseId,
      averageGrade: averageGradeСalculation,
      validMissedClasses: validMissedClasses,
      invalidMissedClasses: invalidMissedClasses,
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
    dispatch(getStudentData());
  }, [dispatch]);

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
          height: '100%',
          pt: '30px',
        }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Выберите студента"
          size="small"
          fullWidth
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
            type={'number'}
            key={index}
            inputProps={{ maxLength: 3, min: 0 }}
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
      </Stack>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            p: '10px',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Решение
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Средний балл: {averageGrade}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {decision}
          </Typography>
        </Paper>
      </Modal>
    </>
  );
};

export default HomePage;
