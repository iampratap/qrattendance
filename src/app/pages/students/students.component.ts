import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any[] = [];
  studentForm: FormGroup;
  
  constructor(private _rest: RestService, private _toastr: ToastrService) {
    this.studentForm = new FormGroup({
      id: new FormControl(),
      batch_id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      parent_mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      dob:new FormControl('',[Validators.required]),
      blood_group: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      is_active: new FormControl('1', [Validators.required])
    });
  }

  ngOnInit(): void {
    
  }

  addstudent() {
    if (this.studentForm.valid) {
      this._rest.addstudent(this.studentForm.value).subscribe((data: any) => {
        console.log(data);
        this.students.push(data.data);
        this._toastr.success(data.message);
        this.ngOnInit();
        this.studentForm.reset();
      }, (error: any) => {
        console.log(error);
        this._toastr.error(error.error.message);
      });
    }
  }

}

