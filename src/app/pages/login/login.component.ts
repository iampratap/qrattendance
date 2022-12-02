import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _rest: RestService,
    private _toastr: ToastrService,
    private _router: Router,
    private _state: StateService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this._rest.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        this._toastr.success(res.message, 'Success');
        localStorage.setItem('token', res.data);
        this._state.getTokenFormLocalStorage((result: boolean) => {
          if (result){
            this._router.navigate(['/app']);
          }
        });
      }, (err) => {
        console.log(err);
        this._toastr.error(err.error.message, 'Error');
      });
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._state.getTokenFormLocalStorage((result: boolean) => {
      if (result){
        this._router.navigate(['/app']);
      }
    });
  }

}
