import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  token: any;
  constructor(http: HttpClient,
    private _router: Router) { }

  ngOnInit() {

    this.token = localStorage.getItem("user");
    console.log(this.token);
  }

  logout() {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    window.location.href = "";
  }

}
