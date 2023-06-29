export interface IQuestion {
  selectedAnswer: string | null;
  all_answers: string[];
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string;
}
