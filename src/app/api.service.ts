import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './model/login';
import { Observable, subscribeOn } from 'rxjs';
import { Task } from './model/task';
import { Profile } from './model/profile';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl = 'https://nodejs-todoapp-0e5l.onrender.com/';

  constructor(private http: HttpClient) {}

  register(form: FormGroup<any>):Observable<Login> {
    const data = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    const apiUrl = this.baseUrl + 'api/v1/users/new';
    return this.http.post<Login>(apiUrl, data, { withCredentials: true });
  }

  login(form: FormGroup<any>): Observable<Login> {

    const data = {
      email: form.value.email,
      password: form.value.password,
    };
    const apiUrl = this.baseUrl + 'api/v1/users/login';
    return this.http.post<Login>(apiUrl, data, { withCredentials: true });
  }

  createTask(form: FormGroup<any>): Observable <Login> {

    const data = {
      title: form.value.title,
      description: form.value.description,
    };

    const apiUrl = this.baseUrl + 'api/v1/tasks/new';
    return this.http.post<Login>(apiUrl, data, { withCredentials: true });
  }

  getTasks(): Observable <Task> {
    const apiUrl = this.baseUrl + 'api/v1/tasks/getTask';
    return this.http.get<Task>(apiUrl, { withCredentials: true });
  }

  deleteTask(task: any):Observable<Login> {
    const apiUrl = this.baseUrl + `api/v1/tasks/${task.id}`;
    return this.http.delete<Login>(apiUrl, { withCredentials: true });
  }

  updateTask(task: any): Observable<Login> {
    const apiUrl = this.baseUrl + `api/v1/tasks/${task.id}`;
    const data = {};
    return this.http.put<Login>(apiUrl, data, { withCredentials: true });
}

  logout(): Observable<Login> {
    const apiUrl = this.baseUrl + `api/v1/users/logout`;
    return this.http.get<Login>(apiUrl);
  }

  profile(): Observable<Profile> {
    const apiUrl = this.baseUrl + `api/v1/users/me/`;
    return this.http.get<Profile>(apiUrl, { withCredentials: true });
  }
}
