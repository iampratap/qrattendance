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
  editadminForm: FormGroup;
  passwordForm: FormGroup;
  selectedAdmin: any = null;

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
    this.editadminForm = new FormGroup({
      id: new FormControl(),
      role: new FormControl('subAdmin', [Validators.required]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      img: new FormControl('', [Validators.required]),
      is_active: new FormControl('1', [Validators.required]),
    });
    this.passwordForm = new FormGroup({
      id: new FormControl(),
      old_password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
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
        this._toastr.success(data.message);
        this.ngOnInit();
      },
      
       (error: any) => {
        console.log(error);
        this._toastr.error(error.error.message);
      });



    
    }
  }

  editAdmin(i: number) {
    this.selectedAdmin = 1;
    this.editadminForm.patchValue(this.admins[i]);
  }

  updateAdmin() {
    this._rest.updateAdmin(this.editadminForm.value).subscribe((data: any) => {
      console.log(data);
      this.selectedAdmin = null;
      this.adminForm.reset();
      this._toastr.success('Admin updated successfully');
      this.ngOnInit();
    }, (error: any) => {
      console.log(error);
      this._toastr.error('Error while updating admin');
    });
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

  updatePassword() {
    if(this.passwordForm.valid && this.passwordForm.value.new_password == this.passwordForm.value.confirm_password) {
      this._rest.updatePassword(this.selectedAdmin.id, this.passwordForm.value).subscribe((data: any) => {
        console.log(data);
        this._toastr.success(data.message);
        this.passwordForm.reset();
      }, (error: any) => {
        console.log(error);
        this._toastr.error(error.error.message);
      });
    }
  }


}
