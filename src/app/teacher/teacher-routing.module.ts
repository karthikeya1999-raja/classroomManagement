import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomDetailsComponent } from './classroom-details/classroom-details.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { TeacherClassroomComponent } from './teacher-classroom/teacher-classroom.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  {path: "teacher", component: TeacherComponent, children: [
    {path: "", component: TeacherDashboardComponent},
    {path: "classrooms", component: TeacherClassroomComponent},
    {path: "classrooms/:id/info", component: ClassroomDetailsComponent},
    {path: "createclassroom", component: CreateClassroomComponent}
  ]}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
