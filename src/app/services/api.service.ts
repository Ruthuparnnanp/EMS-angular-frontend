import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../modules/users/users-list/users.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  base_url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  adminDetails() {
    //api cal to http://localhost:3000/users/1
    return this.http.get(`${this.base_url}/users/1`);
  }

  //get allusers
  getAllUsers() {
    return this.http.get(`${this.base_url}/users`);
  }

  //add user
  adduser(user: UserSchema) {
    return this.http.post(`${this.base_url}/users`, user);
  }

  getexistinguser(id: any) {
    return this.http.get(`${this.base_url}/users/${id}`);
  }

  //editUsers
  updateuser(id: any, data: UserSchema) {
    return this.http.put(`${this.base_url}/users/${id}`, data);
  }

  // deleteuser
  deleteUser(id: any) {
    return this.http.delete(`${this.base_url}/users/${id}`);
  }

  //update admin details
  updateAdminDetails(adminData: UserSchema) {
    return this.http.put(`${this.base_url}/users/1`, adminData);
  }
}
