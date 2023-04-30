import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  constructor(private api: ApiService, private router: Router) {}
  tab: String = "profile";

  tabClick(s: String) {
    if(s != 'logout')
    this.tab = s;
    else {
      this.api.logout().subscribe((value) => {
        if(value.success == true)
          this.tab = 'logout';
      });
    }
  }
}
