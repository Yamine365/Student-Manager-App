import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { StudentsListComponent } from './app/components/students-list/students-list.component';
import { StudentFormComponent } from './app/components/student-form/student-form.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: StudentsListComponent },
  { path: 'add', component: StudentFormComponent },
  { path: 'edit/:id', component: StudentFormComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule, HttpClientModule)
  ]
});
