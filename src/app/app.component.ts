import { Component } from '@angular/core';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, StudentFormComponent, RouterModule] 
})
export class AppComponent {}
