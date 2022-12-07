import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{

  students: any[] = [];
  studentForm: FormGroup ;
  editstudentForm: FormGroup;
  selectedstudent: any = null;

  constructor(private _rest: RestService, private _toastr: ToastrService) {
    this.studentForm = new FormGroup({
      batch_id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      parent_mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      dob: new FormControl('', [Validators.required]),
      blood_group: new FormControl('', [Validators.required]),   
      img: new FormControl('', [Validators.required]),
      is_active: new FormControl('1', [Validators.required]),
    });

    this.editstudentForm = new FormGroup({
       batch_id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      parent_mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      dob: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      blood_group: new FormControl('', [Validators.required]),   
      img: new FormControl('', [Validators.required]),
      is_active: new FormControl('1', [Validators.required]),
    });

  }
 
  ngOnInit(): void {
    this._rest.getallstudents().subscribe((data: any) => {
      console.log(51,data);
      this.students = data.data;
    });
  }

  addstudent() {
    alert('hello')
    if (this.studentForm.valid) {
      this._rest.addstudent(this.studentForm.value).subscribe((data: any) => {
        console.log(data);
        this.students.push(data.data);
      });
    }
    else{
      alert('invalid data')
    }
  }

  editstudent(i: number) {
    this.selectedstudent = 1;
    this.editstudentForm.patchValue(this.students[i]);
  }

  // updatestudent() {
  //   this._rest.updatestudent(this.editstudentForm.value).subscribe((data: any) => {
  //     console.log(data);
  //     this.selectedstudent = null;
  //     this.studentForm.reset();
  //     this._toastr.success('Student updated successfully');
  //     this.ngOnInit();
  //   }, (error: any) => {
  //     console.log(error);
  //     this._toastr.error('Error while updating student');
  //   });
  // }

  updatestudent() {
    this._rest.updatestudent(this.editstudentForm.value).subscribe((data: any) => {
      console.log(data);
      this.selectedstudent = null;
      this.studentForm.reset();
      this._toastr.success('student updated successfully');
      this.ngOnInit();
    }, (error: any) => {
      console.log(error);
      this._toastr.error('Error while updating student');
    });
  }

  deletestudent(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this._rest.deletestudent(id).subscribe((data: any) => {
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