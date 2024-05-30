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
  private highScoresContainer: HTMLElement;
  private highScoresList: HTMLElement;
  private correctionContainer: HTMLElement;
  private correctionContent: HTMLElement;
  private restartButtonCorrection: HTMLElement;
  private userAnswers: string[];
  private clockHand: HTMLElement; // Ajout de cette ligne
  viewCorrectionButton: any;

  constructor(questions: Question[], timePerQuestion = 8) {
    this.questions = questions;
    this.timePerQuestion = timePerQuestion;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timer = null;
    this.userAnswers = [];
    this.viewCorrectionButton = document.getElementById(
      "view-correction-button"
    )!;
    this.viewCorrectionButton.addEventListener("click", () =>
      this.displayCorrections()
    );

    this.questionTextElement = document.getElementById("question-text")!;
    this.answersContainer = document.querySelector(".answers")!;
    this.nextButton = document.getElementById("next-button")!;
    this.restartButton = document.getElementById("restart-button")!;
    this.scoreElement = document.getElementById("score")!;
    this.timerElement = document.getElementById("timer")!;
    this.highScoresContainer = document.getElementById(
      "high-scores-container"
    )!;
    this.highScoresList = document.getElementById("high-scores-list")!;
    this.correctionContainer = document.getElementById("correction-container")!;
    this.correctionContent = document.getElementById("correction-content")!;
    this.restartButtonCorrection = document.getElementById(
      "restart-button-correction"
    )!;
    this.clockHand = document.getElementById("hand")!; // Ajout de cette ligne

    this.nextButton.addEventListener("click", () => this.goToNextQuestion());
    this.restartButton.addEventListener("click", () => this.restartQuiz());
    this.restartButtonCorrection.addEventListener("click", () =>
      this.restartQuiz()
    );

    this.displayQuestion();
    this.displayHighScores();
  }

  private startTimer() {
    let timeLeft = this.timePerQuestion;
    const totalRotation = 360; // Rotation complète de l'aiguille
    const rotationStep = totalRotation / this.timePerQuestion;

    this.timer = window.setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(this.timer!);
        this.goToNextQuestion();
      } else {
        this.timerElement.textContent = `Temps restant : ${timeLeft} secondes`;
        const rotation = (this.timePerQuestion - timeLeft) * rotationStep;
        this.clockHand.style.transform = `rotate(${rotation}deg)`;
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
    this.clockHand.style.transform = "rotate(0deg)";
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
    if (selectedAnswer) {
      this.userAnswers[this.currentQuestionIndex] = selectedAnswer.value;
      if (
        selectedAnswer.value ===
        this.questions[this.currentQuestionIndex].correctAnswer
      ) {
        this.score++;
      }
    } else {
      this.userAnswers[this.currentQuestionIndex] = "No answer";
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
    this.questionTextElement.textContent = `Quiz terminé ! Votre score est : ${this.score}/${this.currentQuestionIndex}`;
    this.answersContainer.innerHTML = "";
    this.nextButton.style.display = "none";
    this.restartButton.style.display = "block"; // Affiche le bouton de redémarrage
    this.viewCorrectionButton.style.display = "block"; // Affiche le bouton de correction
    this.correctionContainer.style.display = "none"; // Masque les corrections au début
    this.scoreElement.textContent = `Voici votre score : ${this.score}/${this.currentQuestionIndex}`;
    this.resetTimer();
    this.saveHighScore();
    this.displayHighScores();
  }

  private displayCorrections() {
    this.correctionContent.innerHTML = ""; // Efface les corrections précédentes
    this.questions.forEach((question, index) => {
      const correctionItem = document.createElement("div");
      const correctAnswerText = question.answers[question.correctAnswer];
      const userAnswer = this.userAnswers[index];

      correctionItem.innerHTML = `
        <h2>Question ${index + 1}: ${question.questionText}</h2>
        <h3>Your answer: ${userAnswer}</h3>
        <h3 class="correct-answer-text"> Correct answer: <span>${correctAnswerText}</span></h3>
      `;
      this.correctionContent.appendChild(correctionItem);
    });
    this.correctionContainer.style.display = "flex"; // Affiche le conteneur de correction
  }

  private restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.correctionContainer.style.display = "none";
    this.viewCorrectionButton.style.display = "none"; // Masque le bouton de correction
    this.displayQuestion();
    this.restartButton.style.display = "none";
    this.nextButton.style.display = "block";
    this.scoreElement.textContent = "Score : 0";
  }

  private saveHighScore() {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(this.score);
    highScores.sort((a: number, b: number) => b - a);
    highScores.splice(5); // Conserve uniquement les 5 meilleurs scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  private displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    this.highScoresList.innerHTML = highScores
      .map((score: number) => `<li>${score}</li>`)
      .join("");
  }
}
