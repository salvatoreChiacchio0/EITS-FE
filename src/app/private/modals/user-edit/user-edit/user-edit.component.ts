import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersGymPageComponent } from 'src/app/private/user-gym/users-gym-page/users-gym-page.component';
import { CrudService } from 'src/app/services/crud-standard/crud.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  roles = ["USER", "ADMIN"]
  modifiedUser:any

  userForm:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:User ,//per la modifica cambiare gym detail

    private formBuilder:FormBuilder,
    private router:Router,
    private registrationService:RegistrationService,
    private crudService:CrudService
    ) {  
}
  ngOnInit(): void {
    
    if(this.data)this.modifiedUser = this.processaData(this.data);

    this.userForm = this.formBuilder.group({
      nome: [this.data?this.modifiedUser?.nome:'', Validators.required],
      cognome: [this.data?this.modifiedUser?.cognome:'', Validators.required],
      email : [this.data?this.modifiedUser?.email:'', [Validators.required, Validators.email]],
      password: [this.data?this.modifiedUser?.password:'', Validators.required],
      role: [this.data?this.modifiedUser?.authorities[0].name:'',Validators.required],

  })
  
  }

  processaData(obj:any){
    
    return obj.element
  }

  onSubmit(){
    if(!this.data){
   this.crudService.createField(this.userForm.value,this.userForm.value.role=="ROLE_ADMIN"?"register/admin":"register/user")
   .subscribe()}else{
    this.crudService.updateField(this.modifiedUser.id,this.userForm.value,"user").subscribe(
      x => {
        
      }
    )
   }
  }
}
