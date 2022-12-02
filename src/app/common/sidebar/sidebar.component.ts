import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _router : Router, private _tostr: ToastrService) { }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
    this._tostr.success('Logged out successfully', 'Come back soon!');
  }

}
