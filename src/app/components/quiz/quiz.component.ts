import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestion, IQuestionData } from '../../shared/questions.model';
import * as he from 'he';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public questions: IQuestionData[] = [];
  public finalScore: number = 0;
  public difficulty: string = 'all';
  public category: string = 'all';
  public categoryName: string = 'all'
  private apiUrl = 'https://opentdb.com/api.php?amount=5';

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.setupUrl();
    this.fetchData();
  }

  fetchData() {
    if(this.category != 'all') {
      this.apiUrl = this.apiUrl.concat(`&category=${this.category}`);
    }

    if(this.difficulty != 'all') {
      this.apiUrl = this.apiUrl.concat(`&difficulty=${this.difficulty.toLowerCase()}`);
    }

    this.http.get<IQuestion>(this.apiUrl).subscribe((data) => {
      console.log(data);
      this.questions = data.results;
      this.randomizeAnswers();
    });
  }

  private setupUrl() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.difficulty = data['difficulty'];
      this.category = data['category'];
      this.categoryName = data['categoryName'];
    })
  }

  submit() {
    this.questions.forEach(question => {
      if(question.correct_answer == question.selectedAnswer) {
        this.finalScore++;
      }
    });

    this.router.navigate(['graded'], {state: {
        questions: this.questions,
        finalScore: this.finalScore,
        difficulty: this.difficulty,
        categoryName: this.categoryName
      }
    });
  }

  randomizeAnswers() {
    this.questions.forEach( (question, index) => {

      //Decode Answers so that they display symbols correctly
      this.questions[index].question = he.decode(question.question);
      this.questions[index].correct_answer = he.decode(question.correct_answer);
      this.questions[index].incorrect_answers.forEach( (iQuestion, i) => {
        this.questions[index].incorrect_answers[i] = he.decode(question.incorrect_answers[i]);
      });

      //Setup selected answer, and randomize list order of all answers
      this.questions[index].selectedAnswer = null;
      this.questions[index].all_answers = [...question.incorrect_answers, question.correct_answer];
      this.questions[index].all_answers.sort(() => Math.random() - 0.5);
    });
  }

  areAllAnswersSelected(): boolean {
    return this.questions.every(question => !!question.selectedAnswer);
  }
}
