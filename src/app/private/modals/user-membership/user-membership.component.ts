import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Abbonamento } from 'src/app/models/abbonamento';

@Component({
  selector: 'app-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.scss']
})
export class UserMembershipComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Abbonamento[] ,
  ) { }

  ngOnInit(): void {
  }

}
