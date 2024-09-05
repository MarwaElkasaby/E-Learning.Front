export interface InstructorInfoWithCourses {
  fName: string;
  lName: string;
  description: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  profilePicture: string;
  totalStudents: 0;
  totalReviews: 0;
  ownedCourses: OwnedCourses[];
}

export interface OwnedCourses {
  id: number;
  title: string;
  description: string;
  coverPicture: string;
  price: number;
  rate: number;
}
