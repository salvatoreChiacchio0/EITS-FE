import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { Esercizio } from 'src/app/models/esercizi';
import { Palestra } from 'src/app/models/palestra';
import { User } from 'src/app/models/user';
import { GymDetailsComponent } from 'src/app/private/gym-details/gym-details.component';
import { EsercizioService } from 'src/app/services/esercizio/esercizio.service';
import { UserService } from 'src/app/services/user/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { SchedeAllenamentoService } from 'src/app/services/schede-allenamento/schede-allenamento.service';
import { Scheda } from 'src/app/models/scheda';

@Component({
  selector: 'app-create-scheda',
  templateUrl: './create-scheda.component.html',
  styleUrls: ['./create-scheda.component.scss']
})
export class CreateSchedaComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('userInput') userInput: ElementRef;
  esercizi:any[]
  users:User[]
  selectedExercise: any[] = []
  createSchedaForm:FormGroup
  selectedId:any = []
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;
  myControlUser = new FormControl('');
  filteredOptionsUser: Observable<User[]>;


  chipList:any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Scheda ,//per la modifica cambiare gym detail
    private esercizioService:EsercizioService,
    private router:Router,
    private userService:UserService,
    private schedaService:SchedeAllenamentoService
  ) { 
  }

  ngOnInit(): void {

    this.getEseercizi()
    this.getUsers()
    this.initForm()

    
  }
  initForm(){
    
    this.createSchedaForm = new FormGroup({
      nome : new FormControl(this.data?this.data?.nome:'',Validators.required),
      idUtente : new FormControl(this.data?this.data?.utente:'',Validators.required),
      dataFine : new FormControl(this.data?this.data?.dataFine:'',Validators.required),
      dataInizio : new FormControl(this.data?this.data?.dataInizio:'',Validators.required),
      idEsercizi : new FormControl(this.data?this.data?.esercizi.map((x:any)=>x.id):'',Validators.required),
    })
    if(this.createSchedaForm.value?.idEsercizi.length>0){
      
      this.selectedExercise.push(...this.data?.esercizi.map((x:any)=>x.nome))
    this.selectedId.push(...this.data.esercizi.map((x:any)=>x.id))
    }
  }
  onSubmit(){
    this.createSchedaForm.controls["dataInizio"].setValue(this.formatDate(this.createSchedaForm.value.dataInizio ))
    this.createSchedaForm.controls["dataFine"].setValue(this.formatDate(this.createSchedaForm.value.dataFine ))

    if(!this.data){
      this.schedaService.createScheda(this.createSchedaForm.value)
      .subscribe(
        x => {
          
        }
      )
    }else{
      
      this.schedaService.updateScheda(this.data.id,this.createSchedaForm.value).subscribe(
        x => {
          
        }
      )
    }
  }

  
 /* private _filter(value: string): any[] {    
    const filterValue = value.toLowerCase();
    return this.esercizi.filter(esercizi => esercizi.nome.toLowerCase().includes(filterValue));
  }*/
  private _filterUser(value: string): any[] {
    
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.email.toLowerCase().includes(filterValue));
  }
  getEseercizi(){
    this.esercizioService.getAllEsercizi().subscribe((res:any)=>{   
      this.filterEsercizi()
     
     this.esercizi = res
   })
  }
  filterEsercizi(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  getUsers(){
    this.userService.getAllUser().subscribe((res:any)=>{  
      this.users = res.content
      this.filteredOptionsUser = this.myControlUser.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUser(value || '')),
      );
    })
  }

  setUserId(id:number){
    
    this.createSchedaForm.controls["idUtente"].setValue(id)

  }



  remove(fruit: string): void {
    const index = this.selectedExercise.indexOf(fruit);

    if (index >= 0) {
      this.selectedExercise.splice(index, 1);
      this.selectedId.splice(index, 1);

    }
    this.createSchedaForm.controls["idEsercizi"].setValue(this.selectedId);
    
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.selectedExercise.includes(event.option.viewValue)){
    this.selectedId.push(event.option.value)
    this.selectedExercise.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.createSchedaForm.controls["idEsercizi"].setValue(this.selectedId);
  }

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.esercizi.filter(fruit => fruit.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  formatDate(date: string | number | Date | null) {
    let pipe = new DatePipe('en-US');
    let formattedDate: string | null;
    formattedDate = pipe.transform(date, 'yyyy-MM-dd');
    return formattedDate;
  }
}
