import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomDetailsComponent } from './classroom-details/classroom-details.component';
import { JoinClassroomComponent } from './join-classroom/join-classroom.component';
import { StudentClassroomComponent } from './student-classroom/student-classroom.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {path:'student', component: StudentComponent, children: [
    { path: '', component: StudentDashboardComponent},
    {path:'classrooms', component: StudentClassroomComponent},
    {path:'classrooms/:id/info', component: ClassroomDetailsComponent},
    {path:'joinclassroom', component: JoinClassroomComponent}
  ]},
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
