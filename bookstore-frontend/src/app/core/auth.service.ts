import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

// Define interfaces for API responses
interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  id: number;
  email: string;
  name: string;
  role:string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('auth_token'));
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const authRequest: AuthRequest = { email, password };
    
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, authRequest)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('current_user', JSON.stringify({
              id: response.id,
              email: response.email,
              name: response.name,
              role: response.role
            }));
            this._isLoggedIn.next(true);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  register(user: User): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        switchMap(() => {
          // After successful registration, log them in
          return this.login(user.email, user.password || '');
        }),
        catchError(() => of(false))
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this._isLoggedIn.next(false);
  }

  currentUser(): User | null {
    return JSON.parse(localStorage.getItem('current_user') || 'null');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  requestPasswordReset(email: string): Observable<boolean> {
    // This endpoint doesn't exist in your backend yet, so return mock for now
    return of(true);
  }
}