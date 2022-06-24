import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { Role } from 'src/app/enum/role';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-register-athlete',
  templateUrl: './register-athlete.component.html',
  styleUrls: ['./register-athlete.component.scss']
})
export class RegisterAthleteComponent implements OnInit {
  roles = ["USER", "ADMIN"]
  userForm:any
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private registrationService:RegistrationService
    ) {  
}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [''],

  })
  }

  onSubmit(){
    this.userForm.controls["role"].setValue(Role.Admin)
    this.registrationService.registerUser(this.userForm.value.email,this.userForm.value.nome,this.userForm.value.password,this.userForm.value.role,this.userForm.value.cognome)
    .subscribe(
      res =>{
         this.router.navigateByUrl(Path.Login)
         
      }
    )
  }



  get getUserForm() {
    return this.userForm.controls;
  }

  returnHome(){
    this.router.navigateByUrl("")
  }
}
