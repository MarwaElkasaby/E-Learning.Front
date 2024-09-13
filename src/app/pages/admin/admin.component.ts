import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import User from '../../models/User';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users :User[] =[];
constructor(private userservice:UserService) {}
  ngOnInit(): void {
this.userservice.getusers().subscribe(users => {
  this.users = users;
});
console.log(this.users);

  }
  
  
}
