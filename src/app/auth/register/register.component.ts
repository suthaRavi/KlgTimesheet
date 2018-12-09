import { Component, OnInit, Output, EventEmitter,TemplateRef, ViewChild } from '@angular/core';
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
      signin: ['', Validators.required],
      password: ['',Validators.required],
      passwordConfirmation: [ '', Validators.required]
    })
  }
  testDialog(){
    alert("test Dialog");
  }
  registerModal(){
    alert("register Dialog");
    //this.modalRef = this.modalService.show(this.template)
  }
 
  onSignUpSubmit(){
    alert("Registration");
    this.tokenService.registerAccount(this.registerData).subscribe(
      res => {
        if(res.status == 200){
          this.onFormResult.emit({ signedUp: true, res})
        }
      },
      err =>{
        console.log(err.json())
        this.onFormResult.emit({signedUp: false, err})
      }
    )
  }

}
