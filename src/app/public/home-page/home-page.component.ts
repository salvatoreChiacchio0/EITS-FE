import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router:Router,
    private utils:UtilsService
  ) { }

  ngOnInit(): void {
  }

  goToRegistration(type:string){
    this.utils.registeOption = type
    this.router.navigateByUrl(Path.Registration)
  }
 

}
