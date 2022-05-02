import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer,private route:Router) { }
  user: any
  filesToUpload: File
  imageUrl
  imageText
  showFileInput=false
  ngOnInit(): void {
    this.user =this.userService.getUser()
    this.userService.avatarView(this.user._id).subscribe((res) => {
      const unsafeImageUrl = URL.createObjectURL(res.body);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    this.imageText=this.imageUrl?"Change Avatar:":"Add Avatar";
    this.showFileInput=this.imageUrl?false:true
    })
  }

  upload() {
    const formData: any = new FormData();
    const file: File = this.filesToUpload;
    formData.append('avatar', file);
    this.userService.avatarUpload(formData).subscribe((files) => {
      alert('File Uploaded Successfully')
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File>fileInput.target.files;
  }
  changeAvatar(){
    this.showFileInput=true
  }
  deleteAccount(){
    this.userService.userDelete().subscribe((user)=>{
      alert('Account Deleted')
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
      this.route.navigate([''])
    })
  }
}
