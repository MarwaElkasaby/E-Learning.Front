import { CreateCourseComponent } from './Components/create-course/create-course.component';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { CourseContentComponent } from './Components/course-content/course-content.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';

import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CategoryComponent } from './Components/category/category.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { EditUserProfileComponent } from './Components/edit-user-profile/edit-user-profile.component';
import { UserCoursesComponent } from './Components/user-courses/user-courses.component';
import { CourseLayoutComponent } from './Components/course-layout/course-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InstructorProfileComponent } from './Components/instructor-profile/instructor-profile.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title:"Taalam - Home" },
      { path: 'cart', component: CartComponent, title:"Taalam - Cart" },
      { path: 'category/:id', component: CategoryComponent, title:"Taalam - Categories" },
      { path: 'wishlist', component: WishlistComponent, title:"Taalam - Wishlist" },
      { path: 'userProfile', component: EditUserProfileComponent, title:"Taalam - UserProfile" },
      { path: 'userCourses', component: UserCoursesComponent , title:"Taalam - MyCourses" },
      { path: 'createCourse', component: CreateCourseComponent , title:"Taalam - CreateCourse" },
      { path: 'instructorProfile/:id', component: InstructorProfileComponent , title:"Taalam - InstructorProfile" },
    ],
  },
  {
    path: '',
    component: CourseLayoutComponent,
    children: [{ path: 'coursecontent/:id', component: CourseContentComponent , title:"Taalam - Course" }],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent , title:"Taalam - Home" },
      { path: 'login', component: LoginComponent , title:"Taalam - Login" },
      { path: 'register', component: RegisterComponent  , title:"Taalam - Register"},
    ],
  },
  { path: '**', component: NotFoundComponent },
];

//scrollpositionrestoration
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Enables scroll position restoration
      anchorScrolling: 'enabled', // Optionally enable anchor scrolling for anchor links
      scrollOffset: [0, 64], // Optional: Adjust the scroll offset if you have a sticky header
    }),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
