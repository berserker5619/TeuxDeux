import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private activatedRoute: ActivatedRoute) { }
  task
  id
  button: string
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!this.id) {
      this.task = {
        title: '',
        description: '',
        completed: false
      }
      this.button = "Create"
    }
    else {
      this.taskService.getTask(this.id).subscribe((task) => {
        this.task = task
      })
      this.button = "Update"
    }
  }
  createTask() {
    if (this.id) {
      this.taskService.updateTask(this.id, { title: this.task.title, description: this.task.description }).subscribe((task) => {
        alert(task.title + " - Task Updated")
        this.router.navigate(['view'], { relativeTo: this.activatedRoute.parent })
      })
    }
    this.taskService.createTask(this.task).subscribe((task) => {
      alert(task.title + " - Task Created")
      this.router.navigate(['view'], { relativeTo: this.activatedRoute.parent })
    })
  }
}
