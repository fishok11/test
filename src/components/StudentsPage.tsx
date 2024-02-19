import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getStudentsData,
  getStudents,
  mainState,
  getCourses,
} from '../app/mainSlice';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StudentsPage: FC = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getCourses());
    dispatch(getStudentsData());
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {state.students.map((student) => (
        <Accordion key={student.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {student.name}
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Курс</TableCell>
                    <TableCell align="right">Оценки</TableCell>
                    <TableCell align="right">Отсутвовал</TableCell>
                    <TableCell align="right">
                      Отсутвовал (без причины)
                    </TableCell>
                    <TableCell align="right">Средняя оценка</TableCell>
                    <TableCell align="right">Решение</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.studentsData
                    .filter(
                      (studentData) => studentData.studentId == student.id,
                    )
                    .map((filterStudentData) => (
                      <TableRow
                        key={filterStudentData.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {state.courses
                            .filter(
                              (course) =>
                                course.id == filterStudentData.courseId,
                            )
                            .map((filterCorse) => filterCorse.title)}
                        </TableCell>
                        <TableCell align="right">
                          {filterStudentData.grades.join()}
                        </TableCell>
                        <TableCell align="right">
                          {filterStudentData.validMissedClasses}
                        </TableCell>
                        <TableCell align="right">
                          {filterStudentData.invalidMissedClasses}
                        </TableCell>
                        <TableCell align="right">
                          {filterStudentData.averageGrade}
                        </TableCell>
                        <TableCell align="right">
                          {filterStudentData.decision}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default StudentsPage;
