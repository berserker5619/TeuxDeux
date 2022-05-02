import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"",loadChildren:()=>import("./user/user.module").then(module=>module.UserModule)},
  {path:"tasks",loadChildren:()=>import("./tasks/tasks.module").then(module=>module.TasksModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
