import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
//import { RegisterComponent} from '../auth/register/register.component';
import {AuthDialogComponent } from '../auth/auth-dialog/auth-dialog.component'
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //@Input() registerComponent: RegisterComponent;
 // @ViewChild('testDialog') testDialog: RegisterComponent;
  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  
  constructor(private router: Router, public tokenService: AngularTokenService,
     ) { }

  ngOnInit() {
  }
  logOut(){
    this.tokenService.signOut().subscribe(
      () => this.router.navigate(['/'])
    );
  }
  presentAuthDialog(mode?: 'Login' | 'Register'){
     console.log("***Present auth dialog " + mode);
    // this.registerComponent.testDialog();
     this.authDialog.openDialog(mode);
    // alert("present auth dialog");
   }

}
