<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 4cfb5d0fd1c4cc7f1d4316bfa8f3c794d9345867
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent  implements OnInit {

  batchs: any[] = [];
  batchForm: FormGroup;
<<<<<<< HEAD

=======
  // editbatchForm: FormGroup;
  // passwordForm: FormGroup;
  // selectedbatch: any = null;
>>>>>>> 4cfb5d0fd1c4cc7f1d4316bfa8f3c794d9345867

  constructor(private _rest: RestService, private _toastr: ToastrService) {
    this.batchForm = new FormGroup({
      id: new FormControl(),
      batch_name: new FormControl('', [Validators.required]),
      batch_time: new FormControl('', [Validators.required ]),

      is_active: new FormControl('1', [Validators.required]),
    });

  }

  ngOnInit(): void {
    // this._rest.getbatchs().subscribe((data: any) => {
    //   console.log(data);
    //   this.batchs = data.data;
    // });
  }

  addbatch() {
    if (this.batchForm.valid) {
      this._rest.addbatch(this.batchForm.value).subscribe((data: any) => {
        console.log(data);
        this.batchs.push(data.data);
        this._toastr.success(data.message);
        this.ngOnInit();
      },
      (error : any) => {
        console.log(error);
        this._toastr.error(error.error.message)

      }
      );
    }
<<<<<<< HEAD
  }


=======
  }  
>>>>>>> 4cfb5d0fd1c4cc7f1d4316bfa8f3c794d9345867
}
