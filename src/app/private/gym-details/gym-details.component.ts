import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { Abbonamento } from 'src/app/models/abbonamento';
import { Palestra } from 'src/app/models/palestra';
import { PalestraService } from 'src/app/services/palestra/palestra.service';
import { GymCreateComponent } from '../modals/gym-create/gym-create/gym-create.component';
import { GymMembershipModalComponent } from '../modals/gym-create/gym-membership-modal/gym-membership-modal.component';
import { SchedaDeleteComponent } from '../modals/scheda-delete/scheda-delete.component';
import { CreateSensorComponent } from '../modals/sensor-create/create-sensor/create-sensor.component';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.scss']
})
export class GymDetailsComponent implements OnInit {
  gym: Palestra

  readonly Path = Path

  isLoading: boolean

  displayedColumns = ["Nome", "Data Fine", "Data Fine", "Costo", "Pagato"];
  dataSource: MatTableDataSource<Abbonamento>;
  palestre!: Palestra[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private palestraService: PalestraService,
    private router: Router,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute

  ) {
    this.getPalestraById()
  }

  ngOnInit(): void {
    this.getPalestraById()
  }

  getPalestraById() {
    this.isLoading = true
    this.palestraService.getPalestraById(this.route.snapshot.params.id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      res => {
        this.gym = res
        this.palestraService.selectedGym = res
        this.dataSource = new MatTableDataSource(this.gym.abbonamenti);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.palestraService.allGym = res
      }
    )
  }
  createGymMembership() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(GymMembershipModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  createGymSensor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    dialogConfig.data = this.gym.id
    const dialogRef = this.dialog.open(CreateSensorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  editGym() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    dialogConfig.data = this.gym
    const dialogRef = this.dialog.open(GymCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  deleteGym() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: this.gym,
      type: "Palestra"
    };
    const dialogRef = this.dialog.open(SchedaDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(Path.GymPage)
    });
  }

  deleteSensore() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: this.gym.sensore,
      type: "Sensore"
    };
    const dialogRef = this.dialog.open(SchedaDeleteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  goBack() {
    this.location.back()
  }
}
