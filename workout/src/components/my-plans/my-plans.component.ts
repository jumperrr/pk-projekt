import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrainingService } from 'src/services/training.servise';


@Component({
  selector: 'my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  workoutplan: any;
  page: 1;

  constructor(private http: HttpClient,
    private _router: Router,
    private trainingService: TrainingService) {
  }

  ngOnInit() {
    if (localStorage.getItem("user") != "") {
      this.trainingService.getUserWorkoutPlan(localStorage.getItem("user")).subscribe((res: any) => {
        this.workoutplan = res;
        this.workoutplan.sort((a, b) => {
          return <any>new Date(b.date) - <any>new Date(a.date);
        });
        console.log(this.workoutplan)
      });
    }
  }

  goToPlan(workoutplanID: number) {
    this._router.navigate(['/workoutplan', workoutplanID]);
  }

}
