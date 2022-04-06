import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadComponent } from './head/head.component';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBneoQxwpoIjlKilkAiu0E_2TZgUPAx8VI",
  authDomain: "classroom-management-5cf8b.firebaseapp.com",
  databaseURL: "https://classroom-management-5cf8b-default-rtdb.firebaseio.com",
  projectId: "classroom-management-5cf8b",
  storageBucket: "classroom-management-5cf8b.appspot.com",
  messagingSenderId: "463607465595",
  appId: "1:463607465595:web:bebe1c04fb44ce7ad7c4de",
  measurementId: "G-7LX36BQRVX"
};


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TeacherModule,
    StudentModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule, // Dataase
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
