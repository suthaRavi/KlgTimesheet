import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { RegisterComponent } from './register/register.component';
import { AngularTokenModule } from 'angular-token';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BootstrapModule,
    AngularTokenModule.forRoot({})
  ],
  declarations: [RegisterComponent, AuthDialogComponent],
 // providers: [AngularTokenModule],
  exports: [RegisterComponent, AuthDialogComponent]
})
export class AuthModule { }
