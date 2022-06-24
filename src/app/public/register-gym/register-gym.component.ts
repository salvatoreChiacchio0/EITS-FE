import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-gym',
  templateUrl: './register-gym.component.html',
  styleUrls: ['./register-gym.component.scss']
})
export class RegisterGymComponent implements OnInit {


  gymForm:any
  constructor(
    private formBuilder:FormBuilder,
    private router:Router
    ) {  this.gymForm = this.formBuilder.group({
      nome: ['', Validators.required],
      indirizzo: ['', Validators.required],
      latitudine: ['', Validators.required],
      longitudine : ['', Validators.required],
  })
}

  ngOnInit(): void {
  }

  onSubmit(){
    
  }



  get getGymForm() {
    return this.gymForm.controls;
  }

  returnHome(){
    this.router.navigateByUrl("")
  }
}
