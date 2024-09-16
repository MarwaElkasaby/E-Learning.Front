import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { UserService } from '../../shared/services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  templateUrl: './admin-table.component.html',
  imports: [NgFor, FormsModule,NgxPaginationModule],
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  page: number = 1;

  constructor(private userservice:UserService) {}
    ngOnInit(): void {
  this.userservice.getusers().subscribe(users => {
    this.users = users;
    this.filteredUsers = users;
  });
  console.log(this.users);
  
    }

 

    filterUsers(): void {
      this.filteredUsers = this.users.filter(user => {
        const term = this.searchTerm.toLowerCase();
        return (
          user.fName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
        );
      });
    }

    approveuser(id: number) {
     this.userservice.approveuser(id).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
      }
}
