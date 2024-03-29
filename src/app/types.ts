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
  id: string;
  studentId: number;
  courseId: number;
  averageGrade: number;
  validMissedClasses: number;
  invalidMissedClasses: number;
  grades: number[];
  decision: string;
};

export type StudentsData = StudentData[];

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Characters = Character[];

export type InfoPages = {
  count: number | null;
  pages: number | null;
  next: string | null;
  prev: string | null;
};

export type GetAllCharactersResponse = {
  info: InfoPages;
  results: Characters;
};

export type Filters = {
  name: string;
  status: string;
  gender: string;
};
