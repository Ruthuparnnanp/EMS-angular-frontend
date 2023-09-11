import { Component } from '@angular/core';
import { UserSchema } from '../users-list/users.model';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user : UserSchema ={};

  constructor(private api : ApiService , private route : Router){

  }

  addUser(){
  
     this.api.adduser(this.user).subscribe({
      next:(result : any)=>{
        alert("User added successfully!!!");
        this.route.navigateByUrl('users');
      },
      error:(error : any)=>{
        alert("Please try again later !!!!"); 
      }
     });
  
  }


  cancel(){
    this.user={};
  }

}
