import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

const routes: Routes = [
  { path: '', component: StudentsListComponent },
  { path: 'add', component: StudentFormComponent },
  { path: 'edit/:id', component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
