import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  baseUrl="https://todo-app-619.herokuapp.com/tasks"
  
  getTasks(filters):Observable<any>{
    return this.http.get(`${this.baseUrl}?completed=${filters.completed}&sortBy=${filters.sortBy}&limit=5&skip=0`)
  }
  getTasksCount():Observable<any>{
    return this.http.get(`${this.baseUrl}/count`)
  }
  getTask(taskId):Observable<any>{
    return this.http.get(`${this.baseUrl}/${taskId}`)
  }
  createTask(task):Observable<any>{
    return this.http.post(`${this.baseUrl}`,task)
  }
  updateTask(taskId,task):Observable<any>{
    return this.http.patch(`${this.baseUrl}/${taskId}`,task)
  }
  deleteTask(taskId):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${taskId}`)
  }
}
