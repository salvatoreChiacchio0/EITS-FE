import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './public/home-page/home-page.component';
import { HeaderComponent } from './public/header/header.component';
import { AboutUsComponent } from './public/about-us/about-us.component';
import { ContactsComponent } from './public/contacts/contacts.component';
import { NavbarComponent } from './public/navbar/navbar.component';
import { RegisterGymComponent } from './public/register-gym/register-gym.component';
import { RegisterAthleteComponent } from './public/register-athlete/register-athlete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogModule } from './helpers/confirm-dialog/confirm-dialog.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './public/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationComponent } from './public/registration/registration.component';
import { GymComponent } from './private/gym-home/gym.component';
import { UserHomeComponent } from './private/user/user-home/user-home.component';
import { HeaderPrivateComponent } from './private/header-private/header-private.component';
import { MapComponent } from './private/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GymDetailsComponent } from './private/gym-details/gym-details.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { GymMembershipModalComponent } from './private/modals/gym-create/gym-membership-modal/gym-membership-modal.component';
import { GymCreateComponent } from './private/modals/gym-create/gym-create/gym-create.component';
import { CreateSensorComponent } from './private/modals/sensor-create/create-sensor/create-sensor.component';
import { MembershipPageComponent } from './private/membership/membership-page/membership-page.component';
import { SchedePageComponent } from './private/schede/schede-page/schede-page.component';
import { UsersGymPageComponent } from './private/user-gym/users-gym-page/users-gym-page.component';
import { EsercizioCreateComponent } from './private/modals/esercizio-create/esercizio-create/esercizio-create.component';
import { CreateSchedaComponent } from './private/modals/scheda-create/create-scheda/create-scheda.component';
import { NavLabelComponent } from './private/header-private/components/nav-label/nav-label.component';
import { SchedaDeleteComponent } from './private/modals/scheda-delete/scheda-delete.component';
import { SchedaDetailComponent } from './private/schede/scheda-detail/scheda-detail.component';
import { EsercizioDetailsComponent } from './private/modals/esercizio-details/esercizio-details.component';
import { EsercizioInfoComponent } from './private/modals/esercizio-info/esercizio-info.component';
import { UserEditComponent } from './private/modals/user-edit/user-edit/user-edit.component';
import { MembershipAddComponent } from './private/modals/membership-add/membership-add/membership-add.component';
import { MembershipModifyComponent } from './private/modals/membership-modify/membership-modify/membership-modify.component';
import { EsercizioAddComponent } from './private/modals/esercizio-add/esercizio-add.component';
import { UserMembershipComponent } from './private/modals/user-membership/user-membership.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuard } from './helpers/auth.guard';
import { LoaderComponent } from './shared/loader/loader.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    AboutUsComponent,
    ContactsComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    RegisterGymComponent,
    RegisterAthleteComponent,
    GymComponent,
    UserHomeComponent,
    HeaderPrivateComponent,
    MapComponent,
    GymDetailsComponent,
    GymCreateComponent,
    GymMembershipModalComponent,
    CreateSensorComponent,
    MembershipPageComponent,
    SchedePageComponent,
    UsersGymPageComponent,
    EsercizioCreateComponent,
    CreateSchedaComponent,
    NavLabelComponent,
    SchedaDeleteComponent,
    SchedaDetailComponent,
    EsercizioDetailsComponent,
    EsercizioInfoComponent,
    UserEditComponent,
    MembershipAddComponent,
    MembershipModifyComponent,
    EsercizioAddComponent,
    UserMembershipComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    LeafletModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "en-US" }
    //    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class AppModule { }
