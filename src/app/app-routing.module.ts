import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from './enum/path';
import { Role } from './enum/role';
import { AuthGuard } from './helpers/auth.guard';
import { GymDetailsComponent } from './private/gym-details/gym-details.component';
import { GymComponent } from './private/gym-home/gym.component';
import { MembershipPageComponent } from './private/membership/membership-page/membership-page.component';
import { SchedaDetailComponent } from './private/schede/scheda-detail/scheda-detail.component';
import { SchedePageComponent } from './private/schede/schede-page/schede-page.component';
import { UsersGymPageComponent } from './private/user-gym/users-gym-page/users-gym-page.component';
import { UserHomeComponent } from './private/user/user-home/user-home.component';
import { AboutUsComponent } from './public/about-us/about-us.component';
import { ContactsComponent } from './public/contacts/contacts.component';
import { HomePageComponent } from './public/home-page/home-page.component';
import { LoginComponent } from './public/login/login.component';
import { RegistrationComponent } from './public/registration/registration.component';

const routes: Routes = [
  { path: Path.Login, component: LoginComponent },
  { path: Path.Registration, component: RegistrationComponent },
  { path: Path.Home, component: HomePageComponent },
  { path: Path.ChiSiamo, component: AboutUsComponent },
  { path: Path.Contatti, component: ContactsComponent },
  { path: Path.GymPage, component: GymComponent,canActivate:[AuthGuard], canLoad: [AuthGuard],  data: { roles: [Role.Admin] }},
  { path: Path.GymDetails, component: GymDetailsComponent,canActivate:[AuthGuard], canLoad: [AuthGuard],  data: { roles: [Role.Admin] }},
  { path: Path.UserPage, component: UserHomeComponent,canActivate:[AuthGuard] , canLoad: [AuthGuard],  data: { roles: [Role.User]}},
  { path: Path.UsersGymPage, component: UsersGymPageComponent,canActivate:[AuthGuard] , canLoad: [AuthGuard],  data: { roles: [Role.Admin]}},
  { path: Path.SchedePage, component: SchedePageComponent,canActivate:[AuthGuard], canLoad: [AuthGuard],  data: { roles: [Role.Admin] }},
  { path: Path.SchedaDetails, component: SchedaDetailComponent,canActivate:[AuthGuard] , canLoad: [AuthGuard],  data: { roles: [Role.Admin,Role.User]}},
  { path: Path.MembershipsPage, component: MembershipPageComponent,canActivate:[AuthGuard], canLoad: [AuthGuard],  data: { roles: [Role.Admin] }},
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
