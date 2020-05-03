import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {UpdatePasswordComponent } from './update-password/update-password.component'

const authRoutes: Routes = [
  { path: 'updatePassword',
     component: UpdatePasswordComponent
  },
]
@NgModule({
  
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],

  declarations: []
})
export class AuthRoutingModule { 

}
