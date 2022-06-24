import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, map, Observable, startWith } from 'rxjs';
import { Path } from 'src/app/enum/path';
import { Palestra } from 'src/app/models/palestra';
import { PalestraService } from 'src/app/services/palestra/palestra.service';
import { UserService } from 'src/app/services/user/user.service';
import { GymCreateComponent } from '../modals/gym-create/gym-create/gym-create.component';
import { GymMembershipModalComponent } from '../modals/gym-create/gym-membership-modal/gym-membership-modal.component';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss'],
})
export class GymComponent implements OnInit {
  displayedColumns = ['Nome', 'Indirizzo'];
  dataSource: MatTableDataSource<Palestra>;

  palestre!: Palestra[];

  isLoading: boolean

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  myControl = new FormControl('');
  filteredOptions: Observable<Palestra[]>;
  constructor(
    private palestraService: PalestraService,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.getPalestre();
    //this.dataSource = this.palestre
  }

  getPalestre() {
    this.isLoading = true
    this.palestraService.getPalestre().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.palestraService.allGym = res;
      this.palestre = res;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
      this.getUsers();
    })
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.palestre.filter((palestra) =>
      palestra?.nome.toLowerCase().includes(filterValue)
    );
  }


  goToCreateGym() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(GymCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.getPalestre();
      this.ngOnInit();
    });
  }
  createMembership() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(
      GymMembershipModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  goToGymDetails(gym: any) {
    this.palestraService.selectedGym = gym;
    this.router.navigate(['/gym-details', gym.id]);
  }

  getUsers() {
    this.userService.getAllUser().subscribe((res) => {
      this.userService.allUsers = res;
    });
  }
  ngAfterViewInit() { }
}
