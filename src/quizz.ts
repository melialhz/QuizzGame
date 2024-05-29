import { Question } from "./question";

export class Quiz {
  private questions: Question[];
  private timePerQuestion: number;
  private currentQuestionIndex: number;
  private score: number;
  private timer: number | null;
  private questionTextElement: HTMLElement;
  private answersContainer: HTMLElement;
  private nextButton: HTMLElement;
  private restartButton: HTMLElement;
  private scoreElement: HTMLElement;
  private timerElement: HTMLElement;

  constructor(questions: Question[], timePerQuestion = 8) {
    this.questions = questions;
    this.timePerQuestion = timePerQuestion;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timer = null;

    this.questionTextElement = document.getElementById("question-text")!;
    this.answersContainer = document.querySelector(".answers")!;
    this.nextButton = document.getElementById("next-button")!;
    this.restartButton = document.getElementById("restart-button")!;
    this.scoreElement = document.getElementById("score")!;
    this.timerElement = document.getElementById("timer")!;

    this.nextButton.addEventListener("click", () => this.goToNextQuestion());
    this.restartButton.addEventListener("click", () => this.restartQuiz());

    this.displayQuestion();
  }

  private startTimer() {
    let timeLeft = this.timePerQuestion;
    this.timer = window.setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(this.timer!);
        this.goToNextQuestion();
      } else {
        this.timerElement.textContent = `Temps restant : ${timeLeft} secondes`;
        timeLeft--;
      }
    }, 1000);
  }

  private resetTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.timerElement.textContent = "";
  }

  private displayQuestion() {
    this.resetTimer();
    this.startTimer();
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
      this.endQuiz();
    }

    this.scoreElement.textContent = `Score : ${this.score}/${this.currentQuestionIndex}`;
  }

  private endQuiz() {
    this.questionTextElement.textContent = `Quiz terminé ! Your score is : ${this.score}/${this.currentQuestionIndex}`;
    this.answersContainer.innerHTML = "";
    this.nextButton.style.display = "none";
    this.restartButton.style.display = "block";
    this.scoreElement.textContent = `Voici votre score : ${this.score}/${this.currentQuestionIndex}`;
    this.resetTimer();
  }

  private restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.displayQuestion();
    this.restartButton.style.display = "none";
    this.nextButton.style.display = "block";
    this.scoreElement.textContent = "Score : 0";
  }
}
