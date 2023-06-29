export interface IQuestion {
  responseCode: number;
  results: IQuestionData[];
}

export interface IQuestionData {
  selectedAnswer: string | null;
  all_answers: string[];
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
