import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from 'src/services/training.servise';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'analysis-chart',
  templateUrl: './analysis-chart.component.html',
  styleUrls: ['./analysis-chart.component.css']
})
export class AnalysisChartComponent implements OnInit {

  exerciseID: number;
  public trainings: any = []
  public workoutplan: any = []
  public exercise: any = {}
  public data: any = []


  public treningDate: any = []

  public chartData: any = [{
    exerciseID: null,
    value: null,
    date: Date
  }]

  constructor(private route: ActivatedRoute, private trainingService: TrainingService, private _router: Router) {

    this.route.params.subscribe(p => {
      this.exerciseID = p['id'];

    });
  }

  ngOnInit() {

    if (localStorage.getItem("user") != "") {
      this.trainingService.getUserWorkoutPlan(localStorage.getItem("user")).subscribe((plan: any) => {
        this.workoutplan = plan;
        this.workoutplan = this.workoutplan.sort((a, b) => { return <any>new Date(a.date) - <any>new Date(b.date); });

        this.trainingService.getAllTrainings()
          .subscribe((training: any) => {
            this.trainings = training;

            //get exercises
            this.trainingService.getExercises()
              .subscribe((res: any) => {
                for (let i = 0; i < res.length; i++) {
                  if (res[i].exerciseID == this.exerciseID) {
                    this.exercise = res[i];
                  }
                }

                for (let j = 0; j < this.workoutplan.length; j++) {
                  for (let i = 0; i < this.trainings.length; i++) {
                    if (this.workoutplan[j].workoutplanID == this.trainings[i].workoutplanID) {
                      this.chartData[i] = { value: this.trainings[i].value, date: this.workoutplan[j].date, exerciseID: this.trainings[i].exerciseID }
                    }
                  }
                }

                this.chartData = this.chartData.filter(x => x.exerciseID == this.exerciseID)
                for (let i = 0; i < this.chartData.length; i++) {
                  this.data[i] = this.chartData[i].value
                  this.treningDate[i] = this.chartData[i].date
                  this.treningDate[i] = this.treningDate[i].slice(0, 10)
                }
              });
          });
      });
    }

  }


  public lineChartData: ChartDataSets[] = [
    { data: this.data, label: 'kg' },
  ];
  public lineChartLabels: Label[] = this.treningDate


  public lineChartOptions: (ChartOptions & { annotation: any }) = {

    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{ display: false}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];


  back() {
    this._router.navigate(['/analysis']);
  }


}
