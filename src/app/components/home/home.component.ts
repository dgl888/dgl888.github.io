import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITrivia, ITriviaData } from '../../shared/trivia.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public selectedCategory: string = 'none';
  public selectedDifficulty: string = 'none';
  public categories: ITriviaData[] = [];
  public difficulties = [
    'Easy',
    'Medium',
    'Hard'
  ];

  private apiUrl: string = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.http.get<ITrivia>(this.apiUrl).subscribe((data) => {
      this.categories = data.trivia_categories;
    });
  }

  public createQuiz(): void {
    let id  = this.categories.find(category => category.name === this.selectedCategory)?.id;
    this.router.navigate(['quiz'], {queryParams: {
        category: id, categoryName: this.selectedCategory, difficulty: this.selectedDifficulty
      }
    });
  }

  public onCategorySelected(value: string): void {
    this.selectedCategory = value;
  }

  public onDifficultySelected(value: string) {
    this.selectedDifficulty = value;
  }
}
