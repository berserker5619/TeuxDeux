import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="https://todo-app-619.herokuapp.com/users"

  constructor(private http: HttpClient) { }

  getUser(){
    return JSON.parse(localStorage.getItem('user'))
  }
  isLoggedIn(){
    return localStorage.getItem('user')
  }
  putUser(user){
    localStorage.setItem('user',JSON.stringify(user))
  }
  userRegister(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user)
  }
  userLogin(userLogin): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, userLogin)
  }
  userProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/me`)
  }
  userUpdate(updateUser): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/me`, updateUser)
  }
  userLogout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, undefined)
  }
  userDelete(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/me`)
  }
  avatarUpload(formData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/me/avatar`, formData)
  }
  avatarDelete(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/me/avatar`)
  }
  avatarView(userId): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/avatar`, { observe: 'response', responseType: 'blob' as 'json' })
  }
}
