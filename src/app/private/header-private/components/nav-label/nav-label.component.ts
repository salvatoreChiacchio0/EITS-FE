import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-label',
  templateUrl: './nav-label.component.html',
  styleUrls: ['./nav-label.component.scss'],
})
export class NavLabelComponent implements OnInit {
  @Input() path: string;
  @Input() labelString: string;

  isActive: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkCurrentRoute();
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.checkCurrentRoute();
      }
    });
  }

  private checkCurrentRoute() {
    if (this.router.url.includes(this.path)) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  navigate() {
    this.router.navigateByUrl(this.path);
  }
}
