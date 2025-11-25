import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9846/api/auth';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {}

  // Login: envoie {username, password} et reçoit le token
  login(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  // Register: crée un nouvel utilisateur
  register(user: Credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Sauvegarde le token dans localStorage
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Récupère le token depuis localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Supprime le token (logout)
  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  // Optional: ajout du token dans les headers (si tu n'utilises pas HttpInterceptor)
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
  
}
