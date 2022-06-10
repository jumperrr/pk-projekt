import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class TrainingService {

  constructor(private http: HttpClient,
    private _router: Router, ) { }

    //ip="192.168.0.95"
    ip="127.0.0.1"
    //ip="localhost"


  getUserWorkoutPlan(id) {
    return this.http.get("http://"+this.ip+":3000/workoutplan/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get training by id
  getTrainingById(trainingID) {
    return this.http.get('http://'+this.ip+':3000/training/edit/' + trainingID)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get all exercises
  getExercises() {
    return this.http.get('http://'+this.ip+':3000/exercises')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get all categories
  getAllCategories() {
    return this.http.get('http://'+this.ip+':3000/categories')
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //get all trainings
    getAllTrainings() {
      return this.http.get('http://'+this.ip+':3000/trainings')
        .pipe(map((res: any) => {
          return res;
        }));
    }

  //get training by workoutplanID
  getTrainingByWorkoutplan(workoutplanID) {
    return this.http.get('http://'+this.ip+':3000/training/' + workoutplanID)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //get all units
  getAllUnits() {
    return this.http.get('http://'+this.ip+':3000/units')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //add new training
  addTraining(newTraining: any) {
    this.http.post('http://'+this.ip+':3000/trainings', newTraining)
      .subscribe(
        (res) => {
        }
      );
    console.log('dodano trening: ', newTraining)
  }


  //add new workoutplan
  addPlan(newPlan: any) {
    this.http.post('http://'+this.ip+':3000/workoutplans', newPlan)
      .subscribe(
        (res) => {
        }
      );
    console.log('dodano trening: ', newPlan)
  }


  //Update user
  updateTraining(training) {
    return this.http.put('http://'+this.ip+':3000/training/' + training.trainingID, training)
      .subscribe(() => {
      });
  }

  deleteTraining(trainingID) {
    return this.http.delete('http://'+this.ip+':3000/training/' + trainingID)
    .subscribe(() => {
    });
  }

  deleteWorkoutplan(workoutplanID){
    return this.http.delete('http://'+this.ip+':3000/workoutplan/' + workoutplanID)
    .subscribe(() => {
    });
  }

  getAllExercises() {
    return this.http.get('http://'+this.ip+':3000/exercises')
    .pipe(map((res: any) => {
      return res;
    }));
  }






}