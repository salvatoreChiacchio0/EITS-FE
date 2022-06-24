import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud-standard/crud.service';
import { SchedeAllenamentoService } from 'src/app/services/schede-allenamento/schede-allenamento.service';
import { SchedePageComponent } from '../../schede/schede-page/schede-page.component';

@Component({
  selector: 'app-scheda-delete',
  templateUrl: './scheda-delete.component.html',
  styleUrls: ['./scheda-delete.component.scss']
})
export class SchedaDeleteComponent implements OnInit {
  type:any
  deleteSchedaId:any
  deleteObject:any = {

  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:SchedePageComponent ,
    private schedaService:SchedeAllenamentoService,
    private crudService:CrudService
  ) { }

  ngOnInit(): void {    
    
    this.deleteObject = this.processData(this.data)
  }
  
  deleteScheda(){
    if(this.deleteObject.type == "Scheda")this.deleteObject.type = "schedaAllenamento"
    if(this.deleteObject.type == "Abbonamento")this.deleteObject.type = "abbonamento"
    if(this.deleteObject.type == "Esercizio"){
      this.deleteObject.type = "esercizio"      

      if(this.deleteObject?.scheda){
       this.deleteObject.scheda.idEsercizi = this.deleteObject.scheda.esercizi.filter((element:any)=> {
      return  element.id != this.deleteObject.element.id});       
        delete this.deleteObject.scheda.esercizi
        this.deleteObject.scheda.idEsercizi = this.deleteObject.scheda.idEsercizi.map((x:any)=>x.id)
      this.schedaService.updateScheda(this.deleteObject.scheda.id,this.deleteObject.scheda)
        .subscribe(
          x => {
            
          }
        )
    }
  }

    this.schedaService.deleteAll(this.deleteObject.element.id,this.deleteObject.type)
    .subscribe(
      x=>{
        
      }
    )
  }
  processData(obj:any){
    return {type:obj.type,element:obj.element,scheda:obj.scheda}
  }
}
