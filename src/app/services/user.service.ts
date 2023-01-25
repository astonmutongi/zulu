import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { BaseService,  } from '../services/baseService';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private baseService: BaseService) { }

    //getAll() {
    //    return this.http.get<User[]>(`${config.apiUrl}/users`);
    //}

    register(user: User) {
        return this.http.post(`${this.baseService.apiBaseURL}authenticate/register`, user);
    }

    reset(user: User) {
        return this.http.post(`${this.baseService.apiBaseURL}authenticate/resetpassword`, user);
    }

   // delete(id: number) {
  //      return this.http.delete(`${config.apiUrl}/users/${id}`);
  //  }
}