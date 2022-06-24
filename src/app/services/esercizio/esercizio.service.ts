import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EsercizioService {

  constructor(
    private http:HttpClient
  ) { }
  getEsercizioById(id:number){
    return this.http.get<any>(`${environment.apiUrl}/api/esercizio/${id}`)
  }
  getAllEsercizi(){
    return this.http.get<any>(`${environment.apiUrl}/api/esercizio`)
  }
  createEsercizio(form:any){
    return this.http.post<any>(`${environment.apiUrl}/api/esercizio`,{...form});
  }
  updateEsercizio(id:any,form:any){
    return this.http.put<any>(`${environment.apiUrl}/api/esercizio/${id}`,{...form})
  }
}
