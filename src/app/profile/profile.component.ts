import { Component } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  name: String = "";
  email: String = "";
  createdAt: String = "";
  id: String = "";
constructor(private api: ApiService) {}

ngOnInit() {
  this.api.profile().subscribe((value) => {
    this.name = value.user.name;
    this.email = value.user.email;
    this.id = value.user._id;
    this.createdAt = new Date(value.user.createdAt.substring(0,10)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });
}
}
