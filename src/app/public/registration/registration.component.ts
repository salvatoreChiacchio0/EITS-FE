import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  type:any
  constructor(
    private utils:UtilsService,
    private router:Router
  ) { 
  
    this.utils.registeOption ? this.type = this.utils.registeOption : this.router.navigateByUrl(Path.Home)
  }

  ngOnInit(): void {
  }

}
