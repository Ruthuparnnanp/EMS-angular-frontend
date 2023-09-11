import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from './users.model';
import jspdf, { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  allUsers: UserSchema[] = [];
  userName: string = '';
  searchkey: string = '';

  // pagination
  page = 1;
  totalLength: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.api.getAllUsers().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allUsers = result;
      },
      error: (error: any) => {
        console.log(error);
        alert('Error while fetching the data!!');
      },
    });
  }

  deleteuser(id: any) {
    this.api.deleteUser(id).subscribe({
      next: (result: any) => {
        this.getUserList();
      },
      error: (error: any) => {
        alert('Please try again later ❌');
      },
    });
  }

  sortById() {
    this.allUsers.sort((a: any, b: any) => a.id - b.id);
  }

  sortByName() {
    this.allUsers.sort((a: any, b: any) => a['name'].localeCompare(b['name']));
  }

  // display users-----------------------

  displayActiveUsers() {
    this.api.getAllUsers().subscribe({
      next: (result: any) => {
        this.allUsers = result.filter((item: any) => item['active'] == '1');
      },
    });
  }

  displayInactiveUsers() {
    this.api.getAllUsers().subscribe({
      next: (result: any) => {
        this.allUsers = result.filter((item: any) => item['active'] != '1');
      },
    });
  }

  displayAllUsers() {
    this.getUserList();
  }

  generatePdf() {
    let pdf = new jsPDF();
    pdf.text('All Users', 10, 10);
    pdf.setFontSize(16);
    let head = [['User ID', 'User Name', 'Email', 'Status']];
    let body: any = [];
    this.allUsers.forEach((item: any) => {
      body.push([item.id, item.name, item.email, item.active]);
    });
    autoTable(pdf, { head, body });
    // pdf.output('dataurlnewwindow');
    pdf.save('AllUsers.pdf');
  }
}
