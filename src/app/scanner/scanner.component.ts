import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {

  scanZalKa = false;

  constructor(
    private _rest: RestService,
    private _tostr: ToastrService,
    private _router: Router) {
  }

  showData(event: any) {
    try {
      const data = JSON.parse(event);
      if (data) {
        this.scanZalKa = true;
        const req = {
          student_id: data.student_id,
          date: new Date().toJSON().split('T')[0],
          status: 1
        }
        this._rest.addAttendance(req).subscribe((result : any) => {
          this._tostr.success(result.message);
          this._router.navigate(['/app', 'students']);
        }, err => {
          this._tostr.error(err.error.message);
        })
        console.log(req);
      }
    } catch (error) {
      console.log('Invalid QR code');
    }
  }


}
