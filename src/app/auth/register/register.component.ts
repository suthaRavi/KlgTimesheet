import { Component, OnInit, Output, EventEmitter,TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AngularTokenService, RegisterData } from 'angular-token';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as modal from 'ngx-bootstrap/modal' ;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: RegisterData = <RegisterData>{};
  @Output() onFormResult = new EventEmitter<any>();
  @ViewChild('template') template: TemplateRef<any>
 
  modalRef: modal.BsModalRef;
  public registerForm: FormGroup;

  
  constructor(private tokenService: AngularTokenService,
            private modalService: modal.BsModalService,
            private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      password: ['',Validators.required],
      passwordConfirmation: [ '', Validators.required],
      name: ['', Validators.required]
    })
  }

  onSignUpSubmit(){
   // alert("Registration");
    console.log('Register path ', this.tokenService.apiBase);
    console.log('Login ', this.registerForm.value.login);
    this.registerData.login = this.registerForm.value.login;
    this.registerData.password = this.registerForm.value.password;
    this.registerData.passwordConfirmation = this.registerForm.value.passwordConfirmation;
    this.registerData.name = this.registerForm.value.name;
    
    this.tokenService.registerAccount(this.registerData).subscribe(
      res => {
        if(res.status == 'success'){
          this.onFormResult.emit({ signedUp: true, res});
          console.log('Resgister ', res);
          this.modalService.hide(1);
          
        }
      },
      err =>{
        console.log('Register err ', err);
        console.log('Register error ', err.error.errors);
        alert('Errors' + err.error.errors.full_messages);
        this.onFormResult.emit({signedUp: false, err});
        
      }
    )
    
    
  }
  modalClose(){
    this.modalService.hide(1);
  }
}
