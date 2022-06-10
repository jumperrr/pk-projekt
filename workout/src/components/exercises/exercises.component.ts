import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingService } from 'src/services/training.servise';



@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  //if submit button is pressed
  submitted = false;
  // if edit button is pressed
  edited = false;

  exercise: any;
  exerciseList: any[];
  categoriesList: {};
  unitList: any;

  constructor(private http: HttpClient,
    private trainingService: TrainingService, ) {

    this.trainingService.getAllExercises()
      .subscribe((exercises: any) => {
        this.exerciseList = exercises;
      });

    this.trainingService.getAllCategories()
      .subscribe((category: any) => {
        this.categoriesList = category;
      });



  }

  ngOnInit() {
    this.trainingService.getAllUnits()
      .subscribe((unit: any) => {
        this.unitList = unit;
      });

  }

  unity(unitID) {
    if (this.unitList)

      for (let i = 0; i < this.unitList.length; i++) {
        if (unitID == this.unitList[i].unitID)
          return this.unitList[i].name
      }
  }



  /*      
  
    //add new exercise
    addExercise() {
      //this.submitted = true; 
      if (this.edited == true) return;
      this.http.post('http://localhost:3000/exercise/', this.exercise)
        .subscribe(
          (res) => {
            console.log(res);
            this.getAllExercises();
          }
        );
    }
  
    updateExercise() {
      this.edited = true;
      this.http.put('http://localhost:3000/exercise/' + this.exercise.exerciseID, this.exercise)
        .subscribe(() => {
          this.getAllExercises();
        });
    }
  
      // Update a exercise record in the database
      onEditClick(event: any, data: any) {
        console.log(data);
        this.exercise.exerciseID = data.exerciseID;
        this.exercise.name = data.name;
        this.exercise.categoryID = data.categoryID;
        this.exercise.unitID = data.unitID;
      }
  
        // Delete a exercise record in the database
    onDeleteClick(event: any, data: any) {
      this.http.delete('http://localhost:3000/exercise/' + data.exerciseID)
        .subscribe(() => {
          this.getAllExercises();
        });
    } */

}
