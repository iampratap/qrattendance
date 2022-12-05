import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  token: string = '';
  user: any = undefined;

  constructor(private _router: Router) { }

  getTokenFormLocalStorage(callback: any) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') + '';
      this.user = jwt_decode(this.token);
      if (this.user.exp < Math.floor(new Date().getTime() / 1000)) {
        this.token = '';
        this.user = undefined;
        callback(false);
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
      } else {
        callback(true);
      }

    } else {
      this.token = '';
      this.user = undefined;
      callback(false);
    }
  }

}
