import { Question } from "./question";

export class Quiz {
  private questions: Question[];
  private currentQuestionIndex: number;
  private score: number;
  private questionTextElement: HTMLElement;
  private answersContainer: HTMLElement;
  private nextButton: HTMLElement;
  private scoreElement: HTMLElement;
  constructor(questions: Question[]) {
    this.questions = questions;
    this.questionTextElement = document.getElementById("question-text")!;
    this.answersContainer = document.querySelector(".answers")!;
    this.nextButton = document.getElementById("next-button")!;
    this.scoreElement = document.getElementById("score")!;
    this.nextButton.addEventListener("click", () => this.goToNextQuestion());
    this.displayQuestion();
  }

  private displayQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionTextElement.textContent = `Question ${
      this.currentQuestionIndex + 1
    } : ${currentQuestion.questionText}`;

    this.answersContainer.innerHTML = "";
    for (const [option, answerText] of Object.entries(
      currentQuestion.answers
    )) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}) ${answerText}`;
      this.answersContainer.appendChild(label);
    }

    this.questionTextElement.classList.add("show");
    this.answersContainer.classList.add("show");
  }

  private checkAnswer() {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    ) as HTMLInputElement;
    if (
      selectedAnswer &&
      selectedAnswer.value ===
        this.questions[this.currentQuestionIndex].correctAnswer
    ) {
      this.score++;
    }
  }

  private goToNextQuestion() {
    this.checkAnswer();

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.displayQuestion();
    } else {
    }

    this.scoreElement.textContent = `Score : ${this.score}/${this.currentQuestionIndex}`;
  }
}