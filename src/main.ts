import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { StudentsListComponent } from './app/components/students-list/students-list.component';
import { StudentFormComponent } from './app/components/student-form/student-form.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { AuthGuard } from './app/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirige vers /login
  { path: 'login', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent) },
  { path: 'students', component: StudentsListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: StudentFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: StudentFormComponent, canActivate: [AuthGuard] }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule, HttpClientModule),

    // 👉 Ajoute ICI
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
});

