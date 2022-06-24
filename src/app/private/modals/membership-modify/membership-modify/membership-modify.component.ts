import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Abbonamento } from 'src/app/models/abbonamento';
import { UsersGymPageComponent } from 'src/app/private/user-gym/users-gym-page/users-gym-page.component';
import { AbbonamentiService } from 'src/app/services/abbonamento/abbonamenti.service';

@Component({
  selector: 'app-membership-modify',
  templateUrl: './membership-modify.component.html',
  styleUrls: ['./membership-modify.component.scss']
})
export class MembershipModifyComponent implements OnInit {

  editMembershipForm :FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Abbonamento ,
    private abbonamentoService:AbbonamentiService

  ) { }

  ngOnInit(): void {
    
    this.initForm()
  }
  initForm(){
    this.editMembershipForm = new FormGroup({
      nome : new FormControl(this.data.nome,Validators.required),
      pagato : new FormControl(this.data.pagato),
      dataInizio : new FormControl(this.data.dataInizio,Validators.required),
      dataFine : new FormControl(this.data.dataFine,Validators.required),
      costo : new FormControl(this.data.costo,Validators.required),
    })
  
  }
  onSubmit(){
    this.editMembershipForm.controls["dataInizio"].setValue(this.formatDate(this.editMembershipForm.value.dataInizio ))
    this.editMembershipForm.controls["dataFine"].setValue(this.formatDate(this.editMembershipForm.value.dataFine ))

    this.abbonamentoService.updateAbbonamento(this.data.id,this.editMembershipForm.value).subscribe(
      res=>{
        
      }
    )
    
  }
  formatDate(date: string | number | Date | null) {
    let pipe = new DatePipe('en-US');
    let formattedDate: string | null;
    formattedDate = pipe.transform(date, 'yyyy-MM-dd');
    return formattedDate;
  }
  changeStateSettings(){
    this.editMembershipForm.controls["pagato"].setValue(!this.editMembershipForm.value.pagato)
  }
}
