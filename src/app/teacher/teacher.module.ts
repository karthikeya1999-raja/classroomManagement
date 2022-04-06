import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { TeacherClassroomComponent } from './teacher-classroom/teacher-classroom.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { RouterModule } from '@angular/router';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ClassroomDetailsComponent } from './classroom-details/classroom-details.component';



@NgModule({
  declarations: [
    TeacherComponent,
    TeacherClassroomComponent,
    CreateClassroomComponent,
    TeacherDashboardComponent,
    ClassroomDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
