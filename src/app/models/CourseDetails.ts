export interface Lesson {
  id: number;
  title: string;
  duration?: string;
  content?: string;
}

export interface Quiz {
  id: number;
  title: string;
}

export interface Section {
  id: number;
  title: string;
  lessonsNo: number;
  sectionNumber: number;
  lessons: Lesson[];
  quizes: Quiz[];
}

export interface CourseCategory {
  id: number;
  name: string;
}

export interface Instructor {
  id: number;
  fName: string;
  lName: string;
  description?: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  coverPicture: string;
  price: number;
  rate?: number;
  creationDate: string;
  updatedDate?: string | null;
  sectionsNo: number;
  courseCategory: CourseCategory;
  sections: Section[];
  instructor: Instructor;
}
