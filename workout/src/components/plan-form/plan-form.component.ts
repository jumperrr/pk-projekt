import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingService } from 'src/services/training.servise';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  @ViewChild('MyForm', { static: false }) MyForm: NgForm;
  
  newPlan = {
    name: "",
    date: null,
    userID: null
  };

  constructor(private trainingService: TrainingService,
    private _router: Router) { }

  ngOnInit() {
  }
  bsInlineValue = new Date();

  sendPlan() {
    this.newPlan.userID = localStorage.getItem("user");
    this.newPlan.date
    console.log(this.newPlan.date)
    this.trainingService.addPlan(this.newPlan)
    console.log(this.newPlan)
    this._router.navigate(['/plans']);
  }


}
