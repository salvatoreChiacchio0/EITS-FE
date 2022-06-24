import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { Esercizio } from 'src/app/models/esercizi';
import { Scheda } from 'src/app/models/scheda';
import { EsercizioService } from 'src/app/services/esercizio/esercizio.service';
import { SchedeAllenamentoService } from 'src/app/services/schede-allenamento/schede-allenamento.service';
import { EsercizioCreateComponent } from '../../modals/esercizio-create/esercizio-create/esercizio-create.component';
import { EsercizioDetailsComponent } from '../../modals/esercizio-details/esercizio-details.component';
import { CreateSchedaComponent } from '../../modals/scheda-create/create-scheda/create-scheda.component';
import { SchedaDeleteComponent } from '../../modals/scheda-delete/scheda-delete.component';

@Component({
  selector: 'app-schede-page',
  templateUrl: './schede-page.component.html',
  styleUrls: ['./schede-page.component.scss']
})
export class SchedePageComponent implements OnInit {
  schede: Scheda[]
  esercizi: Esercizio[]
  isLoading = false

  displayedColumns = ['Nome', 'Data Inizio', 'Data Fine', ' '];
  dataSource: MatTableDataSource<Scheda>;

  displayedColumnsEsercizi = ['Nome', 'Tipo', ' '];
  dataSourceEsercizi: MatTableDataSource<Esercizio>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginatorEsercizio: MatPaginator;
  @ViewChild(MatSort) sortEsercizio: MatSort;


  constructor(
    private schedeService: SchedeAllenamentoService,
    private esercizioService: EsercizioService,
    public dialog: MatDialog,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getSchede()
    this.getEsercizi()

  }

  getSchede() {
    this.schedeService.getAllSchede().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.schede = res;

      }
    )

  }
  getEsercizi() {
    this.isLoading = true
    this.esercizioService.getAllEsercizi().pipe(finalize(() => this.isLoading = false)).subscribe(
      res => {
        this.esercizi = res
        this.dataSourceEsercizi = new MatTableDataSource(res);
        this.dataSourceEsercizi.paginator = this.paginatorEsercizio;
        this.dataSourceEsercizi.sort = this.sortEsercizio;
      }
    )
  }
  createScheda() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(CreateSchedaComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()

    });
  }
  createEsercizio() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(EsercizioCreateComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()

    });
  }

  deleteScheda(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: element,
      type: "Scheda"
    };
    const dialogRef = this.dialog.open(SchedaDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }


  editScheda(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(CreateSchedaComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  detailScheda(element: any) {
    this.router.navigate(['/scheda', element.id]);
  }



  //esercizi

  deleteEsercizio(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: element,
      type: "Esercizio"
    };
    const dialogRef = this.dialog.open(SchedaDeleteComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  editEsercizio(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(EsercizioCreateComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  detailEsercizio(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(EsercizioDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  addEsercizio() { }

}
