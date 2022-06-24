import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Abbonamento } from 'src/app/models/abbonamento';
import { User } from 'src/app/models/user';
import { UsersGymPageComponent } from 'src/app/private/user-gym/users-gym-page/users-gym-page.component';
import { CrudService } from 'src/app/services/crud-standard/crud.service';

@Component({
  selector: 'app-membership-add',
  templateUrl: './membership-add.component.html',
  styleUrls: ['./membership-add.component.scss']
})
export class MembershipAddComponent implements OnInit {
  membershipForm:any
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('userInput') userInput: ElementRef;
  selectedId:any = []

  selectedAbbonamenti: any[] = []
  userForm:any

  membership:any[]
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:User ,//per la modifica cambiare gym detail
    private crudService:CrudService,
    private formBuilder:FormBuilder,
  ) { }

  getData(endpoint:any){
    this.crudService.getAllFields(endpoint).subscribe(
      x => {
        
        this.membership = x
      }
    )
  }
  ngOnInit(): void {
    this.getData("abbonamento")
    this.initForm()
    this.filterAbbonamenti()
  }

  remove(fruit: string): void {
    const index = this.selectedAbbonamenti.indexOf(fruit);

    if (index >= 0) {
      this.selectedAbbonamenti.splice(index, 1);
      this.selectedId.splice(index, 1);

    }
    this.userForm.controls["abbonamenti"].setValue(this.selectedId);
    
  }
  initForm(){
    this.userForm = this.formBuilder.group({
      abbonamenti: [this.data?this.data?.abbonamenti.map(x=>x.id):'',Validators.required]
  })
  if(this.data?.abbonamenti.length>0){
    this.selectedAbbonamenti.push(...this.data?.abbonamenti.map(x=>x.nome))
  this.selectedId.push(...this.data.abbonamenti.map(x=>x.id))
}
  
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    
    if(!this.selectedAbbonamenti.includes(event.option.viewValue)){
    this.selectedId.push(event.option.value)
    this.selectedAbbonamenti.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userForm.controls["abbonamenti"].setValue(this.selectedId);
  }
}
onSubmit(){
  
  this.selectedId.forEach(
    (item:any) => {
      this.crudService.getFieldById(item,"abbonamento")
      .subscribe(
        data=>{
            data.idUtente = this.data.id
            delete data["id"]
            this.crudService.createField(data,"abbonamento")
            .subscribe(
              res => {                
              }
            )
        }
      )
    }
  )
  
}
filterAbbonamenti(){
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.membership.filter(fruit => fruit.nome.toLowerCase().indexOf(filterValue) === 0);
}
}
