import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Path } from 'src/app/enum/path';
import { Palestra } from 'src/app/models/palestra';
import { GymDetailsComponent } from 'src/app/private/gym-details/gym-details.component';
import { PalestraService } from 'src/app/services/palestra/palestra.service';

@Component({
  selector: 'app-gym-create',
  templateUrl: './gym-create.component.html',
  styleUrls: ['./gym-create.component.scss']
})
export class GymCreateComponent implements OnInit {
  modifiedGym:any
  createGymForm:FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:GymDetailsComponent ,
    private formBuilder: FormBuilder,
    private palestreService: PalestraService,
    private router:Router
  ) { }

  ngOnInit(): void {
   this.modifiedGym = this.data;
    
    this.initForm()
  }

  initForm(){
    this.createGymForm = new FormGroup({
      nome : new FormControl(this.data?this.modifiedGym?.nome:'',Validators.required),
      indirizzo : new FormControl(this.data?this.modifiedGym?.indirizzo:'',Validators.required),
      latitudine : new FormControl(this.data?this.modifiedGym?.latitudine:'',Validators.required),
      longitudine : new FormControl(this.data?this.modifiedGym?.longitudine:'',Validators.required),
    })
  }
  onSubmit(){
    if(!this.data){
      this.palestreService.createPalestra(this.createGymForm.value)
      .subscribe(
        res => {
          this.router.navigateByUrl(Path.GymPage)
        }
      )
    }else{
      this.palestreService.updatePalestra(this.modifiedGym.id,this.createGymForm.value).subscribe()
    }
  }
}
