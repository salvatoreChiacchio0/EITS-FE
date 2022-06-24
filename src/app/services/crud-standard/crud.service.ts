import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http:HttpClient
  ) { }
  getFieldById(id:any,endpoint:any){
    return this.http.get<any>(`${environment.urlApi}${endpoint.toLowerCase()}/${id}`)
  }
  getAllFields(endpoint:any){
    return this.http.get<any>(`${environment.urlApi}${endpoint.toLowerCase()}`)
  }
  createField(gymForm:any,endpoint:any){
    return this.http.post<any>(`${environment.urlApi}${endpoint.toLowerCase()}`,{...gymForm})
  }
  updateField(id:any,form:any,endpoint:any){    
    return this.http.put<any>(`${environment.urlApi}${endpoint.toLowerCase()}/${id}`,{...form})
  }
  deleteField(id:any,endpoint:any){
    return this.http.delete<any>(`${environment.urlApi}${endpoint.toLowerCase()}/${id}`)
  }
}
