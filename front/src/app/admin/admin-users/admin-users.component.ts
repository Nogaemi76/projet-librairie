import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  customers = [
    { lastname: 'Lambert', firstname: 'Marie', email: 'marie.lambert@gmail.com' },
    { lastname: 'Garret', firstname: 'Mike', email: 'mike.garret@gmail.com' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
