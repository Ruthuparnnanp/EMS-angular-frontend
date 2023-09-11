import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserSchema } from '../modules/users/users-list/users.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css'],
})
export class EditAdminComponent {
  url = './assets/balloon.jpg'; //may be error because type is not defined !!!!!!!!
  editAdminStatus = false;
  admin: UserSchema = {};

  @Output() onUpdate = new EventEmitter();

  constructor(private api: ApiService) {
    //putting this code in ngOnint is better
    this.api.adminDetails().subscribe({
      next: (res: UserSchema) => {
        console.log(res);
        this.admin = res;
        if (res.picture) {
          this.url = res.picture;
        }
      },
      error: (error: any) => {
        console.log('Please try again later !!!');
      },
    });
  }

  adminStatus() {
    this.editAdminStatus = true;
  }

  getFile(event: any) {
    let file = event.target.files[0];
    let fr = new FileReader(); //filereader is a predefined class ,so we are making object of it to convert the file to url
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      this.url = event.target.result; //url is present in result property at onload.
      this.admin.picture = event.target.result;
    };
  }

  update() {
    this.api.updateAdminDetails(this.admin).subscribe({
      next: (result: any) => {
        console.log(result);
        localStorage.setItem('admin_name', result.name);
        localStorage.setItem('admin_pswd', result.password);
        this.onUpdate.emit(result.name);
        alert('Updated successfully ✔️');
        this.editAdminStatus = false; //to go back to admin default component from edit.
      },
      error: (error: any) => {
        console.log('Please try again later!!!');
      },
    });
  }

  cancel() {
    this.editAdminStatus = false; //to go back to admin default component from edit.
  }
}
