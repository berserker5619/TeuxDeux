import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userForm
  user: any
  formName: string
  isLoggedIn=false
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router) { }
  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.isLoggedIn=true
      this.formName = "Update"
      this.user = this.userService.getUser()
      this.userForm = this.formBuilder.group({
        name: [this.user.name, Validators.required],
        age: [this.user.age, Validators.required],
        email: [this.user.email, [Validators.required, , Validators.email]],
        password: [this.user.password, [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$')]],
      });
    }
    else {
      this.formName = "Sign Up"
    }
  }
  onSubmit() {
    const user = {
      name: this.userForm.get('name').value,
      age: this.userForm.get('age').value,
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value
    }
    if (this.userForm.valid) {
      if (this.userService.isLoggedIn()) {
        this.userService.userUpdate(user).subscribe((res) => {
          alert('Updataed Successfully')
          this.userService.putUser(res)
        })
      }
      else {
        this.userService.userRegister(user).subscribe((res) => {
          alert('Registered Successfully')
          this.userService.putUser(res)
        })
      }
      this.route.navigate([''])
    }
  }

  cancelUpdate(){
    this.route.navigate(['profile'])
  }
}