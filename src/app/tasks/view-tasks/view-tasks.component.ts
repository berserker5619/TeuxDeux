import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  constructor(private taskService:TaskService, private router: Router,private activatedRoute:ActivatedRoute) { }
  filters={
    completed:false,
    sortBy:'createdAt:desc'
  }
  tasks=[]
  tasksCount=0
  
  ngOnInit(): void {
    this.getTasks()
  }
  orderByCompletion(value){
    this.filters['completed']=value
    this.getTasks()
  }
  orderByCreation(value){
    this.filters['sortBy']="createdAt:"+value
    this.getTasks()
  }
  getTasks(){
    this.tasks=[]
    this.taskService.getTasks(this.filters).subscribe((res)=>{
      this.tasks=res
    })
    this.taskService.getTasksCount().subscribe((res)=>{
      console.log(res);
      this.tasksCount=res      
    })
  }
  deleteTask(taskId){
    this.taskService.deleteTask(taskId).subscribe(()=>{
      alert('Task Deleted')
      this.getTasks()
    })
  }
  completeTask(taskId){
    this.taskService.updateTask(taskId,{completed:true}).subscribe((task)=>{
      alert('Task Updated')
      this.getTasks()
    })
  }
  editTask(task){
    this.router.navigate(['edit',task._id],{relativeTo:this.activatedRoute.parent})
  }
  createTask(){
    this.router.navigate(['create'],{relativeTo:this.activatedRoute.parent})
  }
}
