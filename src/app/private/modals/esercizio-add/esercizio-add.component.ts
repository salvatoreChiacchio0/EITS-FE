import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Esercizio } from 'src/app/models/esercizi';
import { EsercizioService } from 'src/app/services/esercizio/esercizio.service';
import { SchedeAllenamentoService } from 'src/app/services/schede-allenamento/schede-allenamento.service';
import { SchedePageComponent } from '../../schede/schede-page/schede-page.component';

@Component({
  selector: 'app-esercizio-add',
  templateUrl: './esercizio-add.component.html',
  styleUrls: ['./esercizio-add.component.scss']
})
export class EsercizioAddComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  addExerForm:FormGroup

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('userInput') userInput: ElementRef;
  selectedId:any = []

  selectedEsercizi: any[] = []
 
  esercizi:any[]
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any ,

    private schedeService:SchedeAllenamentoService,
    private esercizioService:EsercizioService,

  ) { }

  ngOnInit(): void {    
    this.getEsercizi()
    this.initForm()
    this.filterEsercizi()
  }

  getEsercizi(){
    this.esercizioService.getAllEsercizi().subscribe(
      
        res =>{
          this.esercizi = res
        }
      
    )
  }
  initForm(){
    this.addExerForm = new FormGroup({
      idEsercizi : new FormControl('',Validators.required)
    })
  }

  
  remove(fruit: string): void {
    const index = this.selectedEsercizi.indexOf(fruit);

    if (index >= 0) {
      this.selectedEsercizi.splice(index, 1);
      this.selectedId.splice(index, 1);

    }
    this.addExerForm.controls["idEsercizi"].setValue(this.selectedId);
    
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    
    if(!this.selectedEsercizi.includes(event.option.viewValue)){
    this.selectedId.push(event.option.value)
    this.selectedEsercizi.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.addExerForm.controls["idEsercizi"].setValue(this.selectedId);
  }
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.esercizi.filter(fruit => fruit.nome.toLowerCase().indexOf(filterValue) === 0);
}
filterEsercizi(){
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
}
onSubmit(){
  this.schedeService.updateScheda(this.data,this.addExerForm.value).subscribe()
}
}
