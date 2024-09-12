export interface CourseData {
  userId:number,
  title: string;
  description: string;
  duration: string;
  courseCategory: string;
  coverPicture: string;
  price: number;
  sectionsNo: number;
  sections: Section[];
}
export interface IEnrolledCourse {
  id: number,
  title: string,
  instructorName:string,
  InstructorInfo:string,
  description: string,
  price: number,
  rate: number,
  coverPicture: string,
  categoryName:string,
  duration: number
}

export interface Section {
  sectionTitle: string;
  numberOfLessons: number;
  lessons: Lesson[];
  // quizzes: Quiz[];
}

export interface Lesson {
  lessonTitle: string;
  lessonUrl: string;
}

// export interface Quiz {
//   question: string;
//   answer: Answer[];
// }

// export interface Answer {
//   choise1?: string;
//   choice2?: string;
//   choise3?: string;
//   choice4?: string;
// }
