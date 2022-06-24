import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { Role } from 'src/app/enum/role';
import { ConfirmDialogService } from 'src/app/helpers/confirm-dialog/confirm-dialog.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isPasswordHidden = true;
  errorMessage:string
  boolError = false
  logged = false
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authentication:AuthenticationService,
    private confirmDialogService: ConfirmDialogService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authentication.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
     res => {
       this.goToPrivateArea(res)
       this.boolError = false
       this.logged = true
     }
   )
  
  }

  onChange() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  get getLoginForm() {
    return this.loginForm.controls;
  }

  returnHome(){
    this.router.navigateByUrl("")
  }
  goToPrivateArea(response:any){
    let getUser = JSON.parse(localStorage.getItem("currentUser")!)
    getUser.role = response.user.role.includes("ROLE_ADMIN")? Role.Admin : Role.User
    getUser.role == Role.Admin? this.router.navigateByUrl(Path.GymPage):this.router.navigateByUrl(Path.UserPage);

  }
}
