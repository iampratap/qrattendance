import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css']
})
export class ViewBatchComponent {
  @Input() batch : any;
}
