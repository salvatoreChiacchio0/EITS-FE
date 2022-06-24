import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Endpoint } from 'src/app/enum/endpoint';
import { User } from 'src/app/models/user';
import { CrudService } from 'src/app/services/crud-standard/crud.service';
import * as _ from 'lodash'
import { UserEditComponent } from '../../modals/user-edit/user-edit/user-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GymCreateComponent } from '../../modals/gym-create/gym-create/gym-create.component';
import { GymMembershipModalComponent } from '../../modals/gym-create/gym-membership-modal/gym-membership-modal.component';
import { MembershipAddComponent } from '../../modals/membership-add/membership-add/membership-add.component';
import { UserMembershipComponent } from '../../modals/user-membership/user-membership.component';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-users-gym-page',
  templateUrl: './users-gym-page.component.html',
  styleUrls: ['./users-gym-page.component.scss']
})
export class UsersGymPageComponent implements OnInit {
  isLoading: boolean

  displayedColumns = ['Nome', 'Cognome', 'Email', " "];
  dataSource: MatTableDataSource<User>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: User[]
  constructor(
    private crudService: CrudService,
    public dialog: MatDialog

  ) {
    this.getUsers()
  }

  getUsers() {
    this.isLoading = true
    this.crudService.getAllFields(Endpoint.AllUsers).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res.body);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.users = res.body;

      }
    )
  }
  ngOnInit(): void {
  }

  filterData($event: any) {

    this.dataSource.filter = $event.target.value;
  }
  onChange($event: any) {
    let filteredData = _.filter(this.users, (item: any) => {
      return item.authorities[0]?.name.toLowerCase() == $event.value.toLowerCase();
    })
    let filteredData2 = _.filter(this.users, (item: any) => {
      return item.authorities[1]?.name.toLowerCase() == $event.value.toLowerCase();
    })
    let arr1: User[] = []
    arr1.push(...filteredData)
    arr1.push(...filteredData2)
    this.dataSource = new MatTableDataSource(arr1)
  }
  onChangeMembership($event: any) {
    let filteredData = this.users.filter((item: any) => {
      return $event.value == "true" ? item.abbonamenti.length > 0 : item.abbonamenti.length == 0
    })

    this.dataSource = new MatTableDataSource(filteredData)
  }



  editUser(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      element: element,
      type: "Utente"
    };
    const dialogRef = this.dialog.open(UserEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  addMembership(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    dialogConfig.data = element
    const dialogRef = this.dialog.open(MembershipAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  createUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '350px';
    const dialogRef = this.dialog.open(UserEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  userMembership(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '400px';
    dialogConfig.data = element.abbonamenti

    const dialogRef = this.dialog.open(UserMembershipComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });

  }
  reset() {
    this.dataSource = new MatTableDataSource(this.users)
  }
}
