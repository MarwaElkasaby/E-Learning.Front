import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { CourseContentComponent } from './Components/course-content/course-content.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CategoryComponent } from './Components/category/category.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { EditUserProfileComponent } from './Components/edit-user-profile/edit-user-profile.component';
import { UserCoursesComponent } from './Components/user-courses/user-courses.component';
import { CourseLayoutComponent } from './Components/course-layout/course-layout.component';

export const routes: Routes = [
    {path:'',redirectTo:'login', pathMatch:'full'},
    {
        path:'',
        component:BlankLayoutComponent,
        children:
        [
            {path:'home', component:HomeComponent},
            {path:'cart', component:CartComponent},
            {path:'category', component:CategoryComponent},
            {path:'wishlist', component:WishlistComponent},
            {path:'userProfile', component:EditUserProfileComponent},
            {path:'category', component:CategoryComponent},
            {path:'userCourses', component:UserCoursesComponent},
            {path:'createCourse', component:UserCoursesComponent},
        ]
    },
    {
        path:'',
        component:CourseLayoutComponent,
        children:
        [
            {path:'coursecontent', component:CourseContentComponent},
        ]
    },
    {
        path:'',
        component:AuthLayoutComponent,
        children:
        [
            {path:'home', component:HomeComponent},
            {path:'login',component:LoginComponent},
            {path:'register', component:RegisterComponent}
            
        ]
    },
    {path:'**',component:NotFoundComponent},
];
