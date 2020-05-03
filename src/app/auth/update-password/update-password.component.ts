import { Component, OnInit } from '@angular/core';
import { AngularTokenService, UpdatePasswordData} from 'angular-token';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  public updatePasswordForm: FormGroup;
   updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};

  constructor(private tokenService: AngularTokenService,
        private fb: FormBuilder) { }

  ngOnInit() {
    this.tokenService.userSignedIn() == false;
    this.updatePasswordForm = this.fb.group({
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],

    })
  }

  updatePassword(){
   // console.log('****Update password ', this.updatePasswordForm.value.login);
   console.log("Update passwordData ", this.updatePasswordData);
   console.log("Update 1 ", this.tokenService.userSignedIn());
   this.updatePasswordData.password = this.updatePasswordForm.value.password;
   this.updatePasswordData.passwordConfirmation = this.updatePasswordForm.value.passwordConfirmation;
    this.tokenService.updatePassword(this.updatePasswordData).subscribe(
      res => {
        if(res.status == 'success'){
       //   this.onFormResult.emit({ signedUp: true, res});
          console.log('Update Password ', res);
          this.tokenService.userSignedIn() == false;
          console.log("User signed in ", this.tokenService.userSignedIn());
          
          
        }
      },
      err =>{
        console.log('Register err ', err);
        console.log('Register error ', err.error.errors);
        alert('Errors' + err.error.errors.full_messages);
        //this.onFormResult.emit({signedUp: false, err});
        
      }
    )


  }

}
