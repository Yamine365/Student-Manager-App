import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  standalone: true,                 
  imports: [CommonModule, RouterModule]  
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];

  constructor(private service: StudentService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents() {
    this.service.getAll().subscribe(data => this.students = data);
  }
  editStudent(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteStudent(id: number) {
    if (confirm('Delete this student?')) {
      this.service.delete(id).subscribe(() => this.loadStudents());
    }
  }

  addStudent() {
    this.router.navigate(['/add']);
  }
}
