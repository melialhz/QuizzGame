export class Question {
  questionText: string;
  answers: { [key: string]: string };
  correctAnswer: string;

  constructor(
    questionText: string,
    answers: { [key: string]: string },
    correctAnswer: string
  ) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
}
