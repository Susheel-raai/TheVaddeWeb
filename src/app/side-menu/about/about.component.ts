import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  timeLeft: number = localStorage.getItem('timer') == null ? 60: JSON.parse(localStorage.getItem('timer') || '{}');
  futureDate: any;
  currentDate: any;
  currenttime:any;
  constructor() { }

  ngOnInit(): void {
  }
}
