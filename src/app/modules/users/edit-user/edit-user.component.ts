import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users-list/users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:UserSchema={}

  constructor(private route : ActivatedRoute ,private api : ApiService ,private routee : Router){

  }

ngOnInit(): void {
    this.route.params.subscribe((result : any)=>{
        const {id} = result;
        this.existinguser(id);
      })
}

existinguser(id : any){
  this.api.getexistinguser(id).subscribe({
    next:(result : UserSchema)=>{
      this.user=result;
      console.log(this.user);
    } ,
    error : (error : any )=>{
      console.log("Please try again later!!");
      
    }
  })
}

cancel(userid : any){
   this.existinguser(userid)
}

updateUser(){
  this.api.updateuser(this.user.id,this.user).subscribe({
    next : (result : any)=>{
      alert("User details updated successfully ✅");
      this.routee.navigateByUrl('users');
    },
    error : (error : any)=>{
      alert("Please try again later !!!");
    }
  })
}


}
