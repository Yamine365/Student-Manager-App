import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';

function ageValidator(control: AbstractControl) {
  if (!control.value) return null;
  const birth = new Date(control.value);
  const age = new Date().getFullYear() - birth.getFullYear();
  return age < 20 ? { underAge: true } : null;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private service: StudentService
  ) {}

  ngOnInit(): void {
  this.form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', [Validators.required, ageValidator]]
  });

  const idParam = this.route.snapshot.paramMap.get('id');

if (idParam) {
  this.id = Number(idParam);

  if (!isNaN(this.id)) { 
    this.isEdit = true;
    this.service.getById(this.id).subscribe({
      next: (s) => this.form.patchValue(s),
      error: (err) => console.error('Erreur récupération student:', err)
    });
  } else {
    console.error('L\'id récupéré n\'est pas un nombre:', idParam);
  }
} else {
  this.isEdit = false;
}
}
  onSubmit() {
    if (this.form.invalid) return;
    const student: Student = this.form.value;
    if (this.isEdit) {
      this.service.update(this.id, student).subscribe(() => this.router.navigate(['/']));
    } else {
      this.service.create(student).subscribe(() => this.router.navigate(['/']));
    }
  }
}
