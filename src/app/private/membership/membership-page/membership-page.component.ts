import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Abbonamento } from 'src/app/models/abbonamento';
import { CrudService } from 'src/app/services/crud-standard/crud.service';
import { GymMembershipModalComponent } from '../../modals/gym-create/gym-membership-modal/gym-membership-modal.component';
import { MembershipModifyComponent } from '../../modals/membership-modify/membership-modify/membership-modify.component';
import { SchedaDeleteComponent } from '../../modals/scheda-delete/scheda-delete.component';
import * as _ from 'lodash'
import { finalize } from 'rxjs';

@Component({
  selector: 'app-membership-page',
  templateUrl: './membership-page.component.html',
  styleUrls: ['./membership-page.component.scss']
})
export class MembershipPageComponent implements OnInit {

  isLoading: boolean

  abbonamenti: Abbonamento[]
  displayedColumns = ["Nome", "Data Fine", "Data Fine", "Costo", " "];
  dataSource: MatTableDataSource<Abbonamento>;
  palestre!: Abbonamento[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private crudService: CrudService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getMembership()
  }

  getMembership() {
    this.isLoading = true
    this.crudService.getAllFields("abbonamento").pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      result => {
        this.abbonamenti = result
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    )
  }
  filterData($event: any) {

    this.dataSource.filter = $event.target.value;
  }
  createMembership() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';

    const dialogRef = this.dialog.open(
      GymMembershipModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      this.ngOnInit();
    });
  }
  modifyMembership(element: Abbonamento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = element
    const dialogRef = this.dialog.open(MembershipModifyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  deleteAbbonamento(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: element,
      type: "Abbonamento"
    };
    const dialogRef = this.dialog.open(SchedaDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });

  }
  onChange($event: any) {

    let filteredData = _.filter(this.abbonamenti, (item: any) => {

      return item.pagato.toString() == $event.value;
    })

    this.dataSource = new MatTableDataSource(filteredData)
  }
  reset() {
    this.dataSource = new MatTableDataSource(this.abbonamenti)
  }
}
