import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedeAllenamentoService {

  constructor(
    private http:HttpClient
  ) { }
  getSchedaById(id:any){
    return this.http.get<any>(`${environment.apiUrl}/api/schedaAllenamento/${id}`)
  }
  getAllSchede(){
    return this.http.get<any>(`${environment.apiUrl}/api/schedaAllenamento`)
  }
  createScheda(gymForm:any){
    return this.http.post<any>(`${environment.apiUrl}/api/schedaAllenamento`,{...gymForm})
  }
  updateScheda(id:any,form:any){
    return this.http.put<any>(`${environment.apiUrl}/api/schedaAllenamento/${id}`,{...form})
  }
  deleteAll(id:any,type:any){
    return this.http.delete<any>(`${environment.apiUrl}/api/${type}/${id}`)
  }
}
