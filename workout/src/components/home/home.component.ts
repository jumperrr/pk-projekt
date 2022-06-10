import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token:any; 
  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem("user");
    console.log(this.token);
  }

}
