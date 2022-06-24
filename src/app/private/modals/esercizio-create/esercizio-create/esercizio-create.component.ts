import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { Esercizio } from 'src/app/models/esercizi';
import { GymDetailsComponent } from 'src/app/private/gym-details/gym-details.component';
import { EsercizioService } from 'src/app/services/esercizio/esercizio.service';

@Component({
  selector: 'app-esercizio-create',
  templateUrl: './esercizio-create.component.html',
  styleUrls: ['./esercizio-create.component.scss']
})
export class EsercizioCreateComponent implements OnInit {

  createEsForm:FormGroup
  modifiedEsercizio:Esercizio
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Esercizio ,//ricevo i dati dalla pagina precedente
    private esercizioService:EsercizioService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.modifiedEsercizio= this.data;  
    this.initForm()                           //inizializzo il form
  }
  initForm(){
    this.createEsForm = new FormGroup({
      nome : new FormControl(this.data?this.modifiedEsercizio?.nome:'',Validators.required),
      foto : new FormControl(this.data?this.modifiedEsercizio?.foto:'',Validators.required),
      tempoRecupero : new FormControl(this.data?this.modifiedEsercizio?.tempoRecupero:'',Validators.required),
      numeroRipetizioni : new FormControl(this.data?this.modifiedEsercizio?.numeroRipetizioni:'',Validators.required),
      tipo : new FormControl(this.data?this.modifiedEsercizio?.tipo:'',Validators.required),

    })
  }
  onSubmit(){
    if(!this.data){                                     //se è presente data si tratta di un inserimento
      this.esercizioService.createEsercizio(this.createEsForm.value)
      .subscribe(
        response => {
          this.router.navigateByUrl(Path.SchedePage)
        }
      )
    }else{                                      //altrimentisi tratta di un inserimento
      this.esercizioService.updateEsercizio(this.modifiedEsercizio.id,this.createEsForm.value).subscribe()
    }
  }
}
