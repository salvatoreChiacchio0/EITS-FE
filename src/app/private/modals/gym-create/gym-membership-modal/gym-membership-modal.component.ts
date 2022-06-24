import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { Palestra } from 'src/app/models/palestra';
import { User } from 'src/app/models/user';
import { UsersGymPageComponent } from 'src/app/private/user-gym/users-gym-page/users-gym-page.component';
import { AbbonamentiService } from 'src/app/services/abbonamento/abbonamenti.service';
import { PalestraService } from 'src/app/services/palestra/palestra.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-gym-membership-modal',
  templateUrl: './gym-membership-modal.component.html',
  styleUrls: ['./gym-membership-modal.component.scss']
})
export class GymMembershipModalComponent implements OnInit {
  
  modifiedMembership:any
  createMembershipForm:FormGroup
  gym:Palestra
  palestre:Palestra[]
  users:User[]
  myControl = new FormControl('');
  filteredOptions: Observable<Palestra[]>;
  myControlUser = new FormControl('');
  filteredOptionsUser: Observable<User[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:UsersGymPageComponent ,

    private palestraService:PalestraService,
    private router:Router,
    private userService:UserService,
    private abbonamentoService:AbbonamentiService
  ) { 
    this.getUsers()
    this.getPalestre()
  }

  ngOnInit(): void {
    if(this.data) this.modifiedMembership = this.processData(this.data)
    
    this.initForm()
   

  }
  processData(obj:any){
    return {type:obj.type,element:obj.element}
  }

  private _filter(value: string): any[] {    
    const filterValue = value.toLowerCase();
    return this.palestre.filter(palestra => palestra.nome.toLowerCase().includes(filterValue));
  }
  private _filterUser(value: string): any[] {
    
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.nome.toLowerCase().includes(filterValue));
  }
  initForm(){
    this.createMembershipForm = new FormGroup({
      nome : new FormControl('',Validators.required),
      idPalestra : new FormControl(this.gym?this.gym:'',Validators.required),
      idUtente : new FormControl('',Validators.required),
      pagato : new FormControl(false),
      dataInizio : new FormControl('',Validators.required),
      dataFine : new FormControl('',Validators.required),
      costo : new FormControl('',Validators.required),
    })
  
  }
  getPalestre(){
    this.palestraService.getPalestre().subscribe(res=>{   
      
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
     this.palestre = res
   })
  }
  getUsers(){
    this.userService.getAllUser().subscribe(res=>{  
      this.users = res.content
      this.filteredOptionsUser = this.myControlUser.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUser(value || '')),
      );
    })
  }
  changeAudioSettings(){
    this.createMembershipForm.controls["pagato"].setValue(!this.createMembershipForm.value.pagato)
  }
  onSubmit(){
    this.createMembershipForm.controls["dataInizio"].setValue(this.formatDate(this.createMembershipForm.value.dataInizio ))
    this.createMembershipForm.controls["dataFine"].setValue(this.formatDate(this.createMembershipForm.value.dataFine ))

    this.abbonamentoService.createAbbonamento(this.createMembershipForm.value).subscribe(
      res=>{
        
      }
    )
    
  }
  setGymId(id:number){
    this.createMembershipForm.controls["idPalestra"].setValue(id)
  }
  setUserId(id:number){
    this.createMembershipForm.controls["idUtente"].setValue(id)
  }
  formatDate(date: string | number | Date | null) {
    let pipe = new DatePipe('en-US');
    let formattedDate: string | null;
    formattedDate = pipe.transform(date, 'yyyy-MM-dd');
    return formattedDate;
  }
}
