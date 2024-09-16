import { CreateCourseComponent } from './Components/create-course/create-course.component';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
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

import { SearchResultComponent } from './Components/search-result/search-result.component';

import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CourseContentComponent } from './pages/course-content/course-content.component';

import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { ForgetpasswordtokenComponent } from './pages/forgetpasswordtoken/forgetpasswordtoken.component';
import { AuthguardService } from './guards/authguard.service';
import { AuthCallbackComponentComponent } from './Components/auth-callback-component/auth-callback-component.component';
import { AdminComponent } from './pages/admin/admin.component';

import { InstructorComponent } from './Components/instructor/instructor.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { PaymentapproveComponent } from './pages/paymentapprove/paymentapprove.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';



export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [AuthguardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Taalam - Home' },
      { path: 'cart/:id', component: CartComponent, title: 'Taalam - Cart' },
      {
        path: 'category/:id',
        component: CategoryComponent,
        title: 'Taalam - Categories',
      },
      {
        path: 'wishlist/:id',
        component: WishlistComponent,
        title: 'Taalam - Wishlist',
      },
      {
        path: 'userProfile/:id',
        component: EditUserProfileComponent,
        title: 'Taalam - UserProfile',
      },
      {
        path: 'userCourses/:id',
        component: UserCoursesComponent,
        title: 'Taalam - MyCourses',
      },
      {
        path: 'instructor/:id',
        component: InstructorComponent,
        title: 'Taalam - Instructor',
      },
      {
        path: 'createcourse',
        component: CreateCourseComponent,
        title: 'Taalam - Create Course',
      },
      {
        path: 'editcourse/:id',
        component: EditCourseComponent,
        title: 'Taalam - Edit Course',
      },

      {
        path: 'instructorProfile/:id',
        component: InstructorProfileComponent,
        title: 'Taalam - InstructorProfile',
      },
      {
        path: 'searchResult/:SearchTerm',
        component: SearchResultComponent,
        title: 'Taalam - SearchResult',
      },
      { path: 'course/:id', component: CourseDetailsComponent },
      {
        path: 'paymentapprove',
        component: PaymentapproveComponent,
        title: 'Taalam - Search',
      },
    ],
  },
  {
    path: '',
    component: CourseLayoutComponent,
    children: [
      {
        path: 'coursecontent/:id',
        component: CourseContentComponent,
        title: 'Taalam - Course',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Taalam - Home' },
      { path: 'login', component: LoginComponent, title: 'Taalam - Login' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Taalam - Register',
      },
      { path: 'serachResult', component: SearchResultComponent },
      // { path: 'admin', component: AdminComponent },
      {
        path: 'forget-password',
        component: ForgetpasswordComponent,
        title: 'Taalam - ForgetPassword',
      },
      {
        path: 'forget-passwordToken',
        component: ForgetpasswordtokenComponent,
        title: 'Taalam - ForgetPasswordToken',
      },
      { path: 'auth-callback', component: AuthCallbackComponentComponent },
    ],
  },
  { path: 'course/content/:courseId', component: CourseContentComponent },
  {
    path: 'course/content/:courseId/:lessonId',
    component: CourseContentComponent,
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthguardService],

    children: [
      { path: '', component: AdminHomeComponent },

      { path: 'courses', component: AdminComponent },
      { path: 'users', component: AdminComponent },
      { path: 'announcements', component: AdminComponent },
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
