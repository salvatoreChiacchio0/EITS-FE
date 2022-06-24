import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ing-sftw-Project';
  ngOnInit(): void {
    
  }

  loggedIn(): boolean {
    return localStorage.getItem('currentUser')?false:true
  }
}
