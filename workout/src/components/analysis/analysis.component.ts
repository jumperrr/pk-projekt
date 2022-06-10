import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from 'src/services/training.servise';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  @ViewChild('MyForm', { static: false }) MyForm: NgForm;


  public workoutplan: any = []
  public categories: any;
  public exercises: any;
  public allExercises: any;
  public newTraining: any = {
    trainingID: null,
    value: null,
    exerciseID: null,
    workoutplanID: null,
    exercise_name: null,
    category_name: null,
    categoryID: null
  };

  public exeID: number;




  constructor(private trainingService: TrainingService, private _router: Router) {

  }

  ngOnInit() {

    if (localStorage.getItem("user") != "") {
      this.trainingService.getUserWorkoutPlan(localStorage.getItem("user")).subscribe((plan: any) => {
        this.workoutplan = plan;
        this.workoutplan = this.workoutplan.sort((a, b) => { return <any>new Date(a.date) - <any>new Date(b.date); });
        console.log(this.workoutplan)

      }); 

      //get exercises
      this.trainingService.getExercises()
        .subscribe((res: any) => {
          this.allExercises = res;
          this.exercises = this.allExercises;

        });


    }

    //get categories
    this.trainingService.getAllCategories()
      .subscribe((res: any) => {
        this.categories = res;
      });
  }


  public onChange(value: any) {
    this.exercises = this.allExercises.filter((exe: { categoryID: any }) => exe.categoryID == this.newTraining.categoryID.categoryID);
  }

  public onChange1(value: any) {
    this.exeID = this.newTraining.exerciseID.exerciseID
    console.log(this.exeID)
  }

  showChart() {
    this._router.navigate(['/analysis/' + this.exeID]);
  }

  back() {
    this._router.navigate(['/home']);
  }

}
