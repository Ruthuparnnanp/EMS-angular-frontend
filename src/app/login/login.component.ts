import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  //property
  email : string = '';
  password : string = '';


  constructor(private loginServiceRepresentative : ApiService,private loginRouter :Router  ){
          
  }


  loginCheck(){
    if(this.email && this.password){
      //compare username and password with admin details
      //for that we have to get it from https//:4200/users/1
      this.loginServiceRepresentative.adminDetails().subscribe({
        next:(result : any)=>{
          console.log(result);
          if(this.email === result.email && this.password === result.password ){
            // store details to localstorage
            localStorage.setItem("admin_name",result.name);
            localStorage.setItem("admin_pswd",result.password);
            console.log('Authorization succesfull !!!');
            this.loginRouter.navigateByUrl('home');
          }
          else{
            console.log('Invalid credentials !!!');
            
          }

        },error : (error : any)=>{
          alert("Cannot fetch the data !!!")
        }
      })

    }
    else{
      alert("please fill the details !!!");
    }
  }

}
