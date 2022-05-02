import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TeuxDeux';
  imageUrl: any
  isLoggedIn=false
  user:any
  constructor(private userService:UserService){}
  ngOnInit(){
    if(this.userService.isLoggedIn()){
      this.isLoggedIn=true
      this.user=this.userService.getUser()
    }
  }
  logout(){
    this.userService.userLogout()
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    this.isLoggedIn=false
  }
}
