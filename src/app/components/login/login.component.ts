import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup; // déclaration sans initialisation pour TypeScript

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Initialisation du formulaire DANS le constructeur
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return; 

    const data = this.form.value as { username: string; password: string };

    this.auth.login(data).subscribe({
      next: res => {
        this.auth.saveToken(res.token); // sauvegarde le JWT
        this.router.navigate(['/students']); // redirige vers la liste des étudiants
      },
      error: () => alert('Invalid credentials')
    });
  }
}
