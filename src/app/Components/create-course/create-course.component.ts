import { UploadService } from './../../shared/services/upload.service';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseData } from '../../shared/interfaces/course-data';
import { CoursesService } from '../../shared/services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {
  CourseForm: FormGroup;
  numberOfSections: number = 0;

  token: any;
  tokendata: any;
  userId: any;

  isLoading: boolean = false;

  // Drag and Drop and Cloudinary Config and Functions
  files: File[] = [];
  lessonsFiles: { [sectionIndex: number]: { [lessonIndex: number]: File[] } } =
    {};

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private _ToastrService: ToastrService,
    private _UploadService: UploadService
  ) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokendata = JSON.parse(atob(this.token.split('.')[1]));
      // Extracting user ID, username, and role
      this.userId =
        this.tokendata[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
    }

    this.CourseForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required, Validators.minLength(5)]],
      duration: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      // coverPicture2: ['', Validators.required],
      coverPicture: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      sections: this.fb.array([]),
    });
  }

  get sections(): FormArray {
    return this.CourseForm.get('sections') as FormArray;
  }

  addSection() {
    const section = this.fb.group({
      sectionTitle: ['', Validators.required],
      lessons: this.fb.array([]),
      numberOfLessons: [0], // Add hidden control for lesson count
    });
    this.numberOfSections += 1;
    this.sections.push(section);
    /////////////////////////////////////
    const sectionsArray = this.CourseForm.get('sections') as FormArray;
    const sectionIndex = sectionsArray.length - 1;
    this.lessonsFiles[sectionIndex] = {}; // Initialize lessonsFiles for new section
  }

  removeSection(index: number) {
    this.numberOfSections -= 1;
    this.sections.removeAt(index);
  }

  getLessons(sectionIndex: number): FormArray {
    return this.sections.at(sectionIndex).get('lessons') as FormArray;
  }

  addLesson(sectionIndex: number) {
    const lesson = this.fb.group({
      lessonTitle: ['', Validators.required],
      lessonUrl: ['', Validators.required],
    });

    this.getLessons(sectionIndex).push(lesson);
    // Update the lesson count
    this.updateLessonCount(sectionIndex);
    ////////////////////////////

    // Initialize lessonsFiles for new lesson
    const lessonsArray = this.getLessons(sectionIndex);
    const lessonIndex = lessonsArray.length - 1;
    if (!this.lessonsFiles[sectionIndex]) {
      this.lessonsFiles[sectionIndex] = {};
    }
    this.lessonsFiles[sectionIndex][lessonIndex] = []; // Initialize lessonsFiles for new lesson
  }

  removeLesson(sectionIndex: number, lessonIndex: number) {
    this.getLessons(sectionIndex).removeAt(lessonIndex);
    // Update the lesson count
    this.updateLessonCount(sectionIndex);
    delete this.lessonsFiles[sectionIndex][lessonIndex]; // Remove lesson files data
  }

  updateLessonCount(sectionIndex: number) {
    const lessonsCount = this.getLessons(sectionIndex).length;
    this.sections
      .at(sectionIndex)
      .get('numberOfLessons')
      ?.setValue(lessonsCount);
  }

  onSelect(event: any) {
    // Check if a file is already selected and clear it if necessary
    if (this.files.length > 0) {
      alert('You can only select one file at a time.');
      return;
    }

    // Get the selected file and validate it
    const file = event.addedFiles[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (jpg, png, etc.).');
      return;
    }

    // Add the file to the array
    this.files.push(file);

    // Update the form control value for coverPicture with the selected file
    this.CourseForm.patchValue({
      coverPicture: file,
    });

    // Optionally mark the control as dirty or touched to show validation errors if necessary
    this.CourseForm.get('coverPicture')?.markAsTouched();
    this.uploadImageFile();
  }

  // Handle file removal
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);

    // Clear the form control when the file is removed
    this.CourseForm.patchValue({
      coverPicture: null,
    });

    // Mark the control as untouched if necessary
    this.CourseForm.get('coverPicture')?.markAsUntouched();
  }

  uploadImageFile() {
    // Check if the form is valid and if a file has been selected
    if (!this.CourseForm.get('coverPicture')?.valid) {
      // if (!this.CourseForm.valid) {
      alert('Please select a cover picture before uploading.');
      return;
    }

    const file = this.CourseForm.get('coverPicture')?.value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Taalam_Project'); // Set your Cloudinary unsigned preset

    // Call the upload service and handle the response
    this._UploadService.uploadImage(formData).subscribe({
      next: (response) => {
        console.log(response.secure_url);
        const secureUrl = response.secure_url;

        // Set the coverPicture value in the CourseForm to the secure URL
        this.CourseForm.patchValue({
          coverPicture: secureUrl,
        });
      },
      error: (err) => {
        console.error('Upload error:', err);
        alert('An error occurred while uploading the file.');
      },
    });
  }

  onSelectLessonFile(event: any, sectionIndex: number, lessonIndex: number) {
    const files = event.addedFiles;
    if (!this.lessonsFiles[sectionIndex]) {
      this.lessonsFiles[sectionIndex] = {};
    }
    if (!this.lessonsFiles[sectionIndex][lessonIndex]) {
      this.lessonsFiles[sectionIndex][lessonIndex] = [];
    }
    this.lessonsFiles[sectionIndex][lessonIndex].push(...files);

    // Update form control value for lessonUrl with the file name or path
    this.getLessons(sectionIndex)
      .at(lessonIndex)
      .get('lessonUrl')
      ?.setValue(files[0].name); // You can use URL.createObjectURL(files[0]) for a local URL

    // Automatically upload the selected video
    this.uploadVideoFile(sectionIndex, lessonIndex);
  }

  onRemoveLessonFile(file: File, sectionIndex: number, lessonIndex: number) {
    this.lessonsFiles[sectionIndex][lessonIndex] = this.lessonsFiles[
      sectionIndex
    ][lessonIndex].filter((f) => f !== file);
    // If no files left, clear the form control value for lessonUrl
    if (this.lessonsFiles[sectionIndex][lessonIndex].length === 0) {
      this.getLessons(sectionIndex)
        .at(lessonIndex)
        .get('lessonUrl')
        ?.setValue('');
    }
  }

  uploadVideoFile(sectionIndex: number, lessonIndex: number) {
    const file = this.lessonsFiles[sectionIndex][lessonIndex][0];

    if (!file) {
      alert('Please select a video before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Taalam_Project');

    this._UploadService.uploadVideo(formData).subscribe({
      next: (response) => {
        console.log(response);
        const secureUrl = response.secure_url;
        const publicId = response.public_id; // Store public_id

        // Update the lesson form with the video URL and public_id
        this.getLessons(sectionIndex).at(lessonIndex).patchValue({
          lessonUrl: secureUrl,
          lessonPublicId: publicId, // Add this field to store public_id
        });

        this._ToastrService.success('Video uploaded successfully.');

        // alert('Video uploaded successfully.');
      },
      error: (err) => {
        console.error('Upload error:', err);
        this._ToastrService.success(
          'An error occurred while uploading the video.'
        );
        // alert('An error occurred while uploading the video.');
      },
    });
  }

  // onRemoveLessonFile(file: File, sectionIndex: number, lessonIndex: number) {
  //   const publicId = this.getLessons(sectionIndex)
  //     .at(lessonIndex)
  //     .get('lessonPublicId')?.value;

  //   if (publicId) {
  //     // Delete the video from Cloudinary
  //     this._UploadService.deleteVideo(publicId).subscribe({
  //       next: () => {
  //         console.log('Video deleted successfully from Cloudinary.');

  //         // Remove the video from the form and lessonsFiles array
  //         this.lessonsFiles[sectionIndex][lessonIndex] = this.lessonsFiles[
  //           sectionIndex
  //         ][lessonIndex].filter((f) => f !== file);
  //         this.getLessons(sectionIndex).at(lessonIndex).patchValue({
  //           lessonUrl: '', // Clear the URL
  //           lessonPublicId: '', // Clear the public ID
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Error deleting video from Cloudinary:', err);
  //         alert('An error occurred while deleting the video.');
  //       },
  //     });
  //   } else {
  //     // If no publicId is found, just remove it from the UI
  //     this.lessonsFiles[sectionIndex][lessonIndex] = this.lessonsFiles[
  //       sectionIndex
  //     ][lessonIndex].filter((f) => f !== file);
  //   }
  // }

  isSubmitting: boolean = false; // Add this flag

  onsubmit() {
    if (this.isSubmitting) return; // Prevent double submission
    this.isSubmitting = true; // Set the flag to true

    if (this.CourseForm.invalid) {
      this.CourseForm.markAllAsTouched();
      this.isSubmitting = false; // Reset the flag
      return;
    } else {
      this.isLoading = true;
      const formData = this.CourseForm.value;
      let json: CourseData = this.convertToJson(formData);
      console.log('Form Data to Submit:', json);

      this.courseService.submitCourse(json).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isSubmitting = false; // Reset the flag on success
          console.log('Success Response:', response);
          this._ToastrService.success(
            response.message || 'Course Uploaded Successfully'
          );
        },
        error: (err) => {
          this.isLoading = false;
          this.isSubmitting = false; // Reset the flag on error
          console.error('Error Response:', err);
          this._ToastrService.error(
            err.message || 'An error occurred while uploading the course.'
          );
        },
      });
    }
  }

  convertToJson(formData: any): CourseData {
    return {
      userId: this.userId,
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      courseCategory: formData.category,
      coverPicture: formData.coverPicture,
      price: formData.price,
      sectionsNo: this.numberOfSections,
      sections: formData.sections.map((section: any) => ({
        sectionTitle: section.sectionTitle,
        numberOfLessons: section.numberOfLessons, // Include number of lessons in the JSON
        lessons: section.lessons.map((lesson: any) => ({
          lessonTitle: lesson.lessonTitle,
          lessonUrl: lesson.lessonUrl,
        })),
      })),
    };
  }
}

// {
//   "title": "Machine Learning",
//   "description": "Supervise Learning and Unsupervise Learning",
//   "duration": "15",
//   "courseCategory": "Programming",
//   "coverPicture": "https://www.fsm.ac.in/blog/wp-content/uploads/2022/08/ml-e1610553826718.jpg",
//   "price": 500,
//   "sectionsNo": 1,
//   "rate": 0,
//   "creationDate": "2024-09-08T23:31:23.758Z",
//   "sections": [
//     {
//       "sectionTitle": "Section1",
//       "numberOfLessons": 1,
//       "lessons": [
//         {
//           "lessonTitle": "Lesson1",
//           "lessonUrl": "https://www.youtube.com/watch?v=o74WSoJxGPI"
//         }
//       ]
//     }
//   ]
// }
