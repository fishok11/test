import React, { useState } from 'react';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
} from '../../app/mainSlice';
import { Course, Student, StudentDataToAdded } from '../../app/types';
import ModalDesision from '../../components/Modal/ModalDecision';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import SelectItem from '../../UI/Select/SelectItem';
import styles from './HomePage.module.scss';

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
    dispatch(hideErrorStudentName());
    dispatch(hideErrorCourses());
    dispatch(hideErrorGradesCount());
    dispatch(hideErrorGrades());
    console.log(studentId, courseId);

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
        dispatch(showErrorGradesCount());
      }
      if (grades.length === 0 && gradesCount !== 0) {
        dispatch(showErrorGrades());
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
    console.log(studentData);

    dispatch(addStudentData(studentData));
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
      <div className={styles.container}>
        <Select
          label={'Выберите студента'}
          error={state.errorStudentName}
          helperText={'Обязательное поле'}
          value={studentId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setStudentId(parseInt(e.target.value));
          }}
        >
          {state.students?.map((item: Student) => (
            <SelectItem key={item.id} value={item.id} content={item.name} />
          ))}
        </Select>
        <Select
          label={'Выберите предмет'}
          error={state.errorCourses}
          helperText={'Обязательное поле'}
          value={courseId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCourseId(parseInt(e.target.value));
          }}
        >
          {state.courses?.map((item: Course) => (
            <SelectItem key={item.id} value={item.id} content={item.title} />
          ))}
        </Select>
        <Input
          id={'grade'}
          type={'number'}
          min={0}
          label={'Количество оценок'}
          error={state.errorGradesCount}
          helperText={'Обязательное поле'}
          value={gradesCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGradesCount(parseInt(e.target.value))
          }
        />
        {Array.from({ length: gradesCount }).map((_, index) => (
          <Input
            key={index}
            id={'grade'}
            type={'number'}
            min={1}
            max={5}
            label={'Оценка'}
            error={state.errorGrades}
            helperText={'Обязательное поле'}
            value={grades[index]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleGradeChange(index, parseInt(e.target.value))
            }
          />
        ))}
        <Input
          id={'vmc'}
          type={'number'}
          min={0}
          label={'Пропуски по неуважительной причине'}
          value={quanityValidMissedClasses}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuanityValidMissedClasses(parseInt(e.target.value))
          }
        />
        <Input
          id={'imc'}
          type={'number'}
          min={0}
          label={'Пропуски по неуважительной причине'}
          value={quanityInvalidMissedClasses}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuanityInvalidMissedClasses(parseInt(e.target.value))
          }
        />
        <Button text={'OK'} onClick={handleSubmit} />
      </div>
      <ModalDesision
        openModal={openModal}
        setOpenModal={setOpenModal}
        averageGrade={averageGrade}
        quanityValidMissedClasses={quanityValidMissedClasses}
        quanityInvalidMissedClasses={quanityInvalidMissedClasses}
        decision={decision}
      />
    </>
  );
};

export default HomePage;
