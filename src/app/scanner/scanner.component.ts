import { Component } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {

  constructor() {
  }

  showData(event: any) {
    try {
      const data = JSON.parse(event);
      console.log(data);
    } catch (error) {
      console.log('Invalid QR code');
    }


  }

}
