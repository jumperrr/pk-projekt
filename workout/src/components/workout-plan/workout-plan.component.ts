import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/services/training.servise';


@Component({
  selector: 'workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {
  @ViewChild('MyForm', { static: false }) MyForm: NgForm;

  workoutplanID: number;
  workoutplan: any;
  training: any[]; 

  categories: any [];

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router,
    private trainingService: TrainingService) {


  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.workoutplanID = p['id'];
    });
    
    this.trainingService.getTrainingByWorkoutplan(this.workoutplanID)
    .subscribe((res: any) => {
      this.training = res;
    });
  }

  goToTraining(trainingID: number) {
    this._router.navigate(['/training/'+this.workoutplanID+'/'+trainingID]);
  }

  addTraining() {
    this._router.navigate(['/training/'+this.workoutplanID+'/0']);
  }

  deletePlan(){
    if (confirm('Are you sure to delete all plan?')) {
      this.trainingService.deleteWorkoutplan(this.workoutplanID);
      this._router.navigate(['/plans']);
      }
  }


}
