import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { Role } from 'src/app/enum/role';
import { GymCreateComponent } from '../modals/gym-create/gym-create/gym-create.component';
import { GymMembershipModalComponent } from '../modals/gym-create/gym-membership-modal/gym-membership-modal.component';

@Component({
  selector: 'app-header-private',
  templateUrl: './header-private.component.html',
  styleUrls: ['./header-private.component.scss'],
})
export class HeaderPrivateComponent implements OnInit {
  user: any;
  readonly Path = Path;

  constructor(private router: Router, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);    
  }

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl(Path.Home);
  }

  get isAdmin() {
    return this.user.user && this.user.user.role.includes(Role.Admin);
  }

  goToCreateGym() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(GymCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
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
  goToGymHome() {
    this.router.navigateByUrl(Path.GymPage);
  }
  goToMembershipHome() {
    this.router.navigateByUrl(Path.MembershipsPage);
  }
  goToUsersHome() {
    this.router.navigateByUrl(Path.UsersGymPage);
  }
  goToSchedeHome() {
    this.router.navigateByUrl(Path.SchedePage);
  }
}
