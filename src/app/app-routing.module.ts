import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GradedComponent} from './components/graded/graded.component';
import {HomeComponent} from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'graded', component: GradedComponent
  },
  {
    path: 'quiz', component: QuizComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
