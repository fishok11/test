export type Student = {
  id: number;
  name: string;
};

export type Students = Array<Student>;

export type Course = {
  id: number;
  title: string;
};

export type Courses = Array<Course>;

export type StudentDataToAdded = {
  studentId: number | undefined;
  courseId: number | undefined;
  averageGrade: number;
  validMissedClasses: number;
  invalidMissedClasses: number;
  grades: number[];
  decision: string;
};

export type StudentData = {
  id: number;
  studentId: number;
  courseId: number;
  averageGrade: number;
  validMissedClasses: number;
  invalidMissedClasses: number;
  grades: number[];
  decision: string;
};
