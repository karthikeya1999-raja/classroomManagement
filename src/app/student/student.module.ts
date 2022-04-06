import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { JoinClassroomComponent } from './join-classroom/join-classroom.component';
import { StudentClassroomComponent } from './student-classroom/student-classroom.component';
import { StudentRoutingModule } from './student-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ClassroomDetailsComponent } from './classroom-details/classroom-details.component';



@NgModule({
  declarations: [
    StudentComponent,
    JoinClassroomComponent,
    StudentClassroomComponent,
    StudentDashboardComponent,
    ClassroomDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
