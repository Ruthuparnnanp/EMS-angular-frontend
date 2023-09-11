import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    return !!localStorage.getItem('admin_name'); //!! is to get data as boolean ,if there is no admin name then the data automaticallly will be false
  }
}
