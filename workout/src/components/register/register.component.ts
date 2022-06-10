import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('userForm', { static: false }) userForm: NgForm;

  user = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private http: HttpClient,
    private _router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  addUser() {
    this.userService.addUser(this.user)
    this._router.navigate(['/login']);
  }
}
