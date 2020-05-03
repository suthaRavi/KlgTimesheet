import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { RegisterComponent } from './register/register.component';
import { AngularTokenModule } from 'angular-token';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BootstrapModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000'
    }),
    AuthRoutingModule
  ],
  declarations: [RegisterComponent, AuthDialogComponent, SigninComponent, ResetPasswordComponent, UpdatePasswordComponent],
  providers: [AngularTokenModule],
  exports: [RegisterComponent, AuthDialogComponent, SigninComponent, ResetPasswordComponent, UpdatePasswordComponent ]
})
export class AuthModule { }
