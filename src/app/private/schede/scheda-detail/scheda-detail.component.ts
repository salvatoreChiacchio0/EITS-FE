import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, Observable, startWith } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { Role } from 'src/app/enum/role';
import { Esercizio } from 'src/app/models/esercizi';
import { Scheda } from 'src/app/models/scheda';
import { SchedeAllenamentoService } from 'src/app/services/schede-allenamento/schede-allenamento.service';
import { EsercizioAddComponent } from '../../modals/esercizio-add/esercizio-add.component';
import { EsercizioCreateComponent } from '../../modals/esercizio-create/esercizio-create/esercizio-create.component';
import { CreateSchedaComponent } from '../../modals/scheda-create/create-scheda/create-scheda.component';
import { SchedaDeleteComponent } from '../../modals/scheda-delete/scheda-delete.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
@Component({
  selector: 'app-scheda-detail',
  templateUrl: './scheda-detail.component.html',
  styleUrls: ['./scheda-detail.component.scss']
})
export class SchedaDetailComponent implements OnInit {

  isLoading: boolean

  toggleSelection = false

  searchedScheda: Esercizio[] = []
  scheda: any
  myControl = new FormControl('');
  filteredOptions: Observable<Scheda[]>;

  displayedColumns = ["Nome", "Tipo", "Tempo di recupero", "Ripetizioni"];
  dataSource: MatTableDataSource<Esercizio>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  role: any
  esercizi: any;
  user: any
  constructor(
    private schedaService: SchedeAllenamentoService,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem("currentUser")!)

    this.role = this.user.user.role.includes(Role.Admin) ? true : false
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    this.searchedScheda = this.filterExercise(filterValue)
    this.dataSource = new MatTableDataSource(this.filterExercise(filterValue));
    return this.filterExercise(filterValue)
  }
  filterExercise(filterValue: any) {

    return this.scheda.esercizi.filter((esercizi: any) =>
      esercizi.nome.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit(): void {
    this.getScheda()
  }

  getScheda() {
    this.isLoading = true
    this.schedaService.getSchedaById(this.route.snapshot.params.id).pipe(
      finalize(() => this.isLoading = false)
    )
      .subscribe(
        item => {
          this.esercizi = item.esercizi
          this.scheda = item
          this.searchedScheda = item
          this.dataSource = new MatTableDataSource(item.esercizi);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
        }
      )
  }
  deleteScheda() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: this.scheda,
      type: "Scheda"
    };
    const dialogRef = this.dialog.open(SchedaDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(Path.SchedePage)
    });
  }

  editScheda() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    dialogConfig.data = this.scheda;
    const dialogRef = this.dialog.open(CreateSchedaComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  changeViewExercise(bool: any) {
    this.toggleSelection = bool == 'true' ? true : false
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
  deleteEsercizio(element: any) {
    let esercizi = this.scheda.esercizi.filter((x: any) => x.id != element.id)

    delete this.scheda.esercizi
    this.scheda.idEsercizi = esercizi
    this.schedaService.updateScheda(this.scheda.id, this.scheda).subscribe(
      x => {
        this.ngOnInit()
      }
    )
  }
  addEsercizio() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = this.scheda.id
    const dialogRef = this.dialog.open(EsercizioAddComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  public downloadScheda(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 25;

      PDF.addImage(FILEURI, 'JPEG', 1, position, fileWidth, fileHeight);
      PDF.text("Scheda di Allenamento: " + this.scheda.nome, 60, 15);
      PDF.text("Data Inizio: " + this.scheda.dataInizio + "\t Data Fine " + this.scheda.dataFine, 40, 25);

      PDF.save(this.user.user.cognome + "_" + this.user.user.nome + '_scheda.pdf');
    });
  }

  goBack() {
    this.location.back()
  }
}
