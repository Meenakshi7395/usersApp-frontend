import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAddComponent } from './user-add/user-add.component';
import { LoginComponent } from './login/login.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    component:UserDetailsComponent,
    path:'users'
  },
  {
    component:UserAddComponent,
    path: 'user-add'
  },
  {
    component:UserEditComponent,
    path:'user-edit'
  },
  {
    component:HomeComponent,
    path: 'home'
  },
  {
     component:LoginComponent,
    path: '', 
   },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
