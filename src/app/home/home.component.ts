import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  adminName: string = '';
  totalUserCount = 0;
  visible = true;

  constructor(private api: ApiService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('admin_name')) {
      this.adminName = localStorage.getItem('admin_name') || '';
    }

    this.getCount();
  }

  updateAdmin(event: any) {
    this.adminName = event;
  }

  getCount() {
    this.api.getAllUsers().subscribe((result: any) => {
      this.totalUserCount = result.length;
    });
  }

  openSidebar() {
    this.visible = !this.visible;
  }

  // logout
  logout() {
    //remove data from localstorage
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_pswd');
    //redirect to login page
    this.route.navigateByUrl('');
  }
}
