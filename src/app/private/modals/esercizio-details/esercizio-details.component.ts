import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { Esercizio } from 'src/app/models/esercizi';
import { CrudService } from 'src/app/services/crud-standard/crud.service';
import { GymDetailsComponent } from '../../gym-details/gym-details.component';
import { EsercizioCreateComponent } from '../esercizio-create/esercizio-create/esercizio-create.component';

@Component({
  selector: 'app-esercizio-details',
  templateUrl: './esercizio-details.component.html',
  styleUrls: ['./esercizio-details.component.scss']
})
export class EsercizioDetailsComponent implements OnInit {

  esercizio:Esercizio
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Esercizio,
    public dialog: MatDialog,
    private router:Router,
    private crudService:CrudService

  ) { }

  ngOnInit(): void {
    this.crudService.getFieldById(this.data.id,"esercizio")
    .subscribe(
      result => {
        this.esercizio = result
      }
    )
  }

  editEsercizio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component-edit';
    dialogConfig.width = '300px';
    dialogConfig.data = this.data;
    const dialogRef = this.dialog.open(EsercizioCreateComponent, dialogConfig);
    
    
    dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit()

    });
  }
}
