function createQuestionMark(): HTMLElement {
  const questionMark = document.createElement("div");
  questionMark.textContent = "?";
  questionMark.classList.add("question-mark");
  questionMark.style.left = `${Math.random() * 100}vw`;
  questionMark.style.animationDuration = `${Math.random() * 6 + 6}s`;
  return questionMark;
}

function addQuestionMarks(container: HTMLElement, count: number) {
  for (let i = 0; i < count; i++) {
    const questionMark = createQuestionMark();
    container.appendChild(questionMark);

    questionMark.addEventListener("animationend", () => {
      questionMark.remove();
      container.appendChild(createQuestionMark());
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("question-mark-container")!;
  addQuestionMarks(container, 50);
});
document.getElementById("mode-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
