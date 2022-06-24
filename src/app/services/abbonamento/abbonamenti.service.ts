import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abbonamento } from 'src/app/models/abbonamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbbonamentiService {

  constructor(
    private  http:HttpClient
  ) { }

  getAbbonamentoById(id:number){
    return this.http.get<Abbonamento>(`${environment.apiUrl}/api/abbonamento/${id}`);
  }
  abbonamentoFilter(page?:number,size?:number,sortField?:string,sortDrection?:string){
    return this.http.post<any>(`${environment.apiUrl}/api/abbonamento/filter`,{page,size,sortField,sortDrection});
  }
  createAbbonamento(form:any){
    return this.http.post<any>(`${environment.apiUrl}/api/abbonamento`,{...form});
  }
  updateAbbonamento(id:any, form:any){
    return this.http.put<any>(`${environment.apiUrl}/api/abbonamento/${id}`,{...form});
  }
}
