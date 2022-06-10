import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TrainingService } from 'src/services/training.servise';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  @ViewChild('MyForm', { static: false }) MyForm: NgForm;

  trainingID: number;
  planID: number;

  training: any = {};
  workoutplanID: number;

  checked: boolean;

  newTraining = {
    trainingID: null,
    reps: null,
    value: null,
    exerciseID: null,
    workoutplanID: null,
    done: false,
    exercise_name: null,
    unit_name: null,
    category_name: null,
    categoryID: null
  };

  categories: any;
  exercises: any;
  allExercises: any;
  units: any;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private _router: Router,
  ) {


    this.route.params.subscribe(p => {
      this.trainingID = p['id'];
    });

    this.route.params.subscribe(p => {
      this.newTraining.workoutplanID = p['wid'];
      this.workoutplanID = p['wid'];
    });


    //get training
    this.trainingService.getTrainingById(this.trainingID)
      .subscribe((res: any) => {
        this.training = res[0];
      });

    //get exercises
    this.trainingService.getExercises()
      .subscribe((res: any) => {
        this.allExercises = res;
        this.exercises = this.allExercises;
      });

    //get categories
    this.trainingService.getAllCategories()
      .subscribe((res: any) => {
        this.categories = res;
      });

    //get units
    this.trainingService.getAllUnits()
      .subscribe((res: any) => {
        this.units = res;
      });

  }

  ngOnInit() {

  }

  public onChange(value: any) {
    this.exercises = this.allExercises.filter((exe: { categoryID: any }) => exe.categoryID == this.newTraining.categoryID.categoryID);

  }

  public onChange1(value: any) {
    this.units = this.units.filter((unit: { unitID: any }) => unit.unitID == this.newTraining.exerciseID.unitID);
  }

  sendTraining() {
    this.newTraining.exerciseID = this.newTraining.exerciseID.exerciseID;
    this.trainingService.addTraining(this.newTraining);
    this._router.navigate(['/workoutplan/' + this.newTraining.workoutplanID]);
  }

  editTraining() {

    this.training.workoutplanID = this.workoutplanID;
    this.trainingService.updateTraining(this.training);
    this._router.navigate(['/workoutplan/' + this.training.workoutplanID]);
  }

  deleteTraining() {
    if (confirm('Are you sure to delete?')) {
      this.trainingService.deleteTraining(this.trainingID);
      this._router.navigate(['/workoutplan/' + this.training.workoutplanID]);
    }
  }

  back() {
    this._router.navigate(['/workoutplan/' + this.workoutplanID]);
  }

}
