import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensoreService {

  constructor(
    private http:HttpClient
  ) { }
  createSensor(sensorForm:any){
    return this.http.post<any>(`${environment.apiUrl}/api/sensore`,{...sensorForm})

  }
}
