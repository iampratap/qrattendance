import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins: any[] = [];
  adminForm: FormGroup;
  selectedAdmin = null;

  constructor(private _rest: RestService, private _toastr: ToastrService) {
    this.adminForm = new FormGroup({
      id: new FormControl(),
      role: new FormControl('subAdmin', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      img: new FormControl('', [Validators.required]),
      is_active: new FormControl('1', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._rest.getAdmins().subscribe((data: any) => {
      console.log(data);
      this.admins = data.data;
    });
  }

  addAdmin() {
    if (this.adminForm.valid) {
      this._rest.addAdmin(this.adminForm.value).subscribe((data: any) => {
        console.log(data);
        this.admins.push(data.data);
      });
    }
  }

  deleteAdmin(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this._rest.deleteAdmin(id).subscribe((data: any) => {
        console.log(data);
        this._toastr.success(data.message);
        this.ngOnInit();
      }, (error: any) => {
        console.log(error);
        this._toastr.error(error.error.message);
      });
    }
  }

}
