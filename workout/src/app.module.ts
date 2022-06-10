import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from  '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { WorkoutPlanComponent } from './components/workout-plan/workout-plan.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyPlansComponent } from './components/my-plans/my-plans.component';
import { TrainingComponent } from './components/training/training.component';
import { JwtInterceptor} from './services/jwt.interceptor';
import { PlanFormComponent } from './components/plan-form/plan-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { AnalysisChartComponent } from './components/analysis-chart/analysis-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    NavMenuComponent,
    HomeComponent,
    ExercisesComponent,
    WorkoutPlanComponent,
    LoginComponent,
    RegisterComponent,
    MyPlansComponent,
    TrainingComponent,
    PlanFormComponent,
    AnalysisComponent,
    AnalysisChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule,
    ChartsModule,
    RouterModule.forRoot([
      {path: '', component : HomeComponent},
      {path: 'home', component : HomeComponent},
      {path: 'register', component : RegisterComponent},
      {path: 'exercises', component : ExercisesComponent},
      {path: 'login', component : LoginComponent},
      {path: 'plans', component : MyPlansComponent},
      {path: 'workoutplan/:id', component : WorkoutPlanComponent},
      {path: 'training/:wid/:id', component : TrainingComponent},
      {path: 'newplan/:id', component : PlanFormComponent},
      {path: 'analysis', component : AnalysisComponent},
      {path: 'analysis/:id', component : AnalysisChartComponent},
    ]),
    
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
