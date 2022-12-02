import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'studentqr';

  constructor(private _state: StateService, private _router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._state.getTokenFormLocalStorage((result: boolean) => {
      if (!result){
        this._router.navigate(['/login']);
      }
    });
  }
}
