import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';
import { NgForm, } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('MyForm', { static: false }) userForm: NgForm;

  errorAlertModel: any = {
    text: "",
    visible: false
  };

  credentials = {
    email: '',
    password: ''
  }

  constructor(private http: HttpClient,
    private userService: UserService) { }

  ngOnInit() {
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));
  }

  login() {
    this.userService.login(this.credentials).subscribe((res: any) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.userID);
      window.location.href = "";
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse)
      this.errorAlertModel.visible = true;
      if(errorResponse.status == 500){
      this.errorAlertModel.text = "Incorrect password";
      }
    });

  }

}
