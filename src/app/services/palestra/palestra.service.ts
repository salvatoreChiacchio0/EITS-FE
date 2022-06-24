import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Palestra } from 'src/app/models/palestra';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalestraService {

  
  allGym:Palestra[]
  selectedGym:Palestra
  constructor(
    private http:HttpClient
  ) { }
  getPalestre(){
    return this.http.get<any>(`${environment.apiUrl}/api/palestra`)
  }
  createPalestra(gymForm:any){
    return this.http.post<any>(`${environment.apiUrl}/api/palestra`,{...gymForm})
  }
  getPalestraById(id:any){
    return this.http.get<any>(`${environment.apiUrl}/api/palestra/${id}`)
  }
  updatePalestra(id:any,form:any){
    return this.http.put<any>(`${environment.apiUrl}/api/palestra/${id}`,{...form})
  }
}
