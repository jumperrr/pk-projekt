import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @ViewChild('userForm', { static: false }) userForm: NgForm;

  //if submit button is pressed
  submitted = false;
  // if edit button is pressed
  edited = false;


  user = new User(null, '', '', '');
  userList: Array<User> = []

  constructor(private http: HttpClient, private userService: UserService) {

  }

  ngOnInit() {
  }

  addUser(){

  }

  updateUser(){
    this.userService.updateUser(this.user);
  }

  onDeleteClick(event: any, data: User) {

  }


  // Update a user record in the database
  onEditClick(event: any, data: any) {
    console.log(data);
    this.user.userID = data.userID;
    this.user.name = data.name;
    this.user.email = data.email;
    this.user.password = data.password;
  }

}
