import { Component } from '@angular/core';

import { AdminTableComponent } from "../../Components/admin-table/admin-table.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  {

  
}
