import { Component} from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})

export class BatchComponent {
  batches : any[] = [];
  selectedbatch : any = null;
  constructor(private _rest : RestService){

  }
  ngOnInit(): void
    {
    this._rest.getAllBatches().subscribe((data : any) =>
    {
      console.log(data);
      this.batches = data.data;
    });
  }

  
  
}
