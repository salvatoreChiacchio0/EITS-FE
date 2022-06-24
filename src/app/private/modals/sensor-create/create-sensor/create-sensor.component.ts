import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GymDetailsComponent } from 'src/app/private/gym-details/gym-details.component';
import { SensoreService } from 'src/app/services/sensore/sensore.service';

@Component({
  selector: 'app-create-sensor',
  templateUrl: './create-sensor.component.html',
  styleUrls: ['./create-sensor.component.scss']
})
export class CreateSensorComponent implements OnInit {
  createSensorForm:FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:GymDetailsComponent,
    private formBuilder: FormBuilder,
    private sensoreService:SensoreService
  ) { 
    this.initForm()
  }

  ngOnInit(): void {    
  }

  initForm(){
    this.createSensorForm = new FormGroup({
      nome : new FormControl('',Validators.required),
      idPalestra : new FormControl(this.data)
    })
  }
  onSubmit(){
    this.sensoreService.createSensor(this.createSensorForm.value).subscribe(
      res =>{
        
      }
    )
  }
}
