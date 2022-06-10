import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})


export class UserService {

    constructor(private http: HttpClient,
        private _router: Router, ) { }

    //ip="192.168.0.95"
    ip = "127.0.0.1"
    //ip="localhost"

    //add new user
    addUser(user: any) {

        this.http.post('http://' + this.ip + ':3000/signup', user)
            .subscribe(
                (res) => {
                }
            );
    }

    //Login
    login(credentials) {
        return this.http.post('http://' + this.ip + ':3000/login', credentials)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    //Update user
    updateUser(user) {
        return this.http.put('http://' + this.ip + ':3000/user/' + user.userID, user)
            .subscribe(() => {
            });
    }

    /*     // Read all users records from the database
        getAllUsers() {
            this.http.get('http://localhost:3000/users/')
                .subscribe((users: Array<User>) => {
                    //this.userList = users;
                });
        }
    
        // Read all users records from the database
        getUser(id) {
            this.http.get('http://localhost:3000/user/' + id)
              .subscribe((user: User) => {
                this.user = user;
              });
          }
    
            // Delete a user record in the database
      onDeleteClick(event: any, data: User) {
        this.http.delete('http://localhost:3000/user/' + data.userID)
          .subscribe(() => {
          }); */



}