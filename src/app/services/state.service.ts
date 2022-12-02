import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  token: string = '';
  user = undefined;

  constructor(private _router: Router) { }

  getTokenFormLocalStorage(callback: any) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') + '';
      this.user = jwt_decode(this.token);
      callback(true);
    } else {
      this.token = '';
      this.user = undefined;
      callback(false);
    }
  }

}
