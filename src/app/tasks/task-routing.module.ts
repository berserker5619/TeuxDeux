import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

const routes: Routes = [
    {path:"view",component:ViewTasksComponent},
    {path:"create",component:CreateTaskComponent},
    {path:"edit/:id",component:CreateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
