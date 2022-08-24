import { Component, OnInit } from '@angular/core';
import { DataTransportService } from '../services/data-transport.service';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(private dataService: DataTransportService) { 
    
    
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.dataService.data.subscribe(response => {
      console.log(response);  // you will receive the data from sender component here.
    });
  }

}
