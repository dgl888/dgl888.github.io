import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from '../../shared/results.model';

@Component({
  selector: 'app-graded',
  templateUrl: './graded.component.html',
  styleUrls: ['./graded.component.scss']
})
export class GradedComponent implements OnInit {

  public questions: IQuestion[] = [];
  public finalScore: number = 0;
  public difficulty: string = 'all';
  public categoryName: string = 'all';

  constructor(private router: Router) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.questions = state['questions'];
      this.finalScore = state['finalScore'];
      this.difficulty = state['difficulty'];
      this.categoryName = state['categoryName'];
    }
  }

  ngOnInit(): void {}

  getQuestionClass(answer: string, selectedAnswer: string | null, correct_answer: string) {
    if(answer == correct_answer) {
      return 'correct'
    } else if(answer == selectedAnswer && answer != correct_answer){
      return 'incorrect'
    } else {
      return '';
    }
  }

  setClass() {
    return this.finalScore === 0 || this.finalScore === 1 ? 'fail' : this.finalScore === 2 || this.finalScore === 3 ? 'pass' : 'success';
  }
}
