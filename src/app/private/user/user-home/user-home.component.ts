import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { User } from 'src/app/models/user';
import { AbbonamentiService } from 'src/app/services/abbonamento/abbonamenti.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import * as _ from 'lodash'
import { MatTableDataSource } from '@angular/material/table';
import { Abbonamento } from 'src/app/models/abbonamento';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  localStorageUser:any
  user:any

  displayedColumnsEsercizi= ["Nome", "Data Fine","Data Fine","Num Esercizi"];
  dataSourceEsercizi: MatTableDataSource<Abbonamento>;
  @ViewChild(MatPaginator) paginatorEsercizi: MatPaginator;
  @ViewChild(MatSort) sortEsercizi: MatSort;

  displayedColumns= ["Nome", "Data Fine","Data Fine","Costo"];
  dataSource: MatTableDataSource<Abbonamento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private auth:AuthenticationService,
    private router:Router,
    private abbonamento:AbbonamentiService,
    private userService:UserService
  ) {
    this.localStorageUser = JSON.parse(localStorage.getItem("currentUser")!) 
    if(!this.localStorageUser)router.navigateByUrl(Path.Home)
     this.userService.getUserById(this.localStorageUser.user.id).subscribe(
      user => {
        
        this.user = user
        this.dataSource = new MatTableDataSource(user.abbonamenti);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSourceEsercizi = new MatTableDataSource(user.schedeAllenamento);
        this.dataSourceEsercizi.paginator = this.paginatorEsercizi;
        this.dataSourceEsercizi.sort = this.sortEsercizi;
      }
    )
    
   }

  ngOnInit(): void {
   
  }


  onChange($event:any){    
    
    let filteredData =_.filter(this.user.abbonamenti,(item:any)=>{

      return item.pagato.toString()==$event.value;
    })

     this.dataSource=new MatTableDataSource(filteredData)
  }
  reset(){
    this.dataSource=new MatTableDataSource(this.user.abbonamenti)
   }


   resetEsercizi(){
    this.dataSourceEsercizi = new MatTableDataSource(this.user.schedeAllenamento)
   }
   filterData($event:any){
    this.dataSource.filter=$event.target.value;
   }
   filterDataEsercizi($event:any){
    this.dataSourceEsercizi.filter=$event.target.value;
   }
     detailScheda(element:any){
    this.router.navigate(['/scheda', element.id]);
  }
}
