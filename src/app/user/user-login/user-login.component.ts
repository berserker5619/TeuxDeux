import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService:UserService,private route: Router) { }

  userLogin
  ngOnInit(): void {
    this.userLogin={
      email:'',
      password:''
    }
  }
  login(){
    this.userService.userLogin(this.userLogin).subscribe((res)=>{
      localStorage.setItem('authToken',res.token)
      this.userService.putUser(res.user)
      this.route.navigate([''])
    })
  }
}
