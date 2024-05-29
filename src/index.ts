import { Question } from "./question";
import { Quiz } from "./quizz";

const questions = [
  new Question(
    "Quelle est la capitale de la France ?",
    { a: "Paris", b: "Londres", c: "Berlin", d: "Madrid" },
    "a"
  ),
  new Question(
    "Quelle planète est connue sous le nom de Planète Rouge ?",
    { a: "Mars", b: "Vénus", c: "Jupiter", d: "Neptune" },
    "a"
  ),
  new Question(
    "Quel est le plus grand mammifère du monde ?",
    { a: "Éléphant", b: "Baleine bleue", c: "Girafe", d: "Gorille" },
    "b"
  ),
  new Question(
    "Quelle est la capitale du Canada ?",
    { a: "Ottawa", b: "Singapour", c: "Berlin", d: "Madrid" },
    "a"
  ),
  new Question(
    "Quel gaz les plantes absorbent-elles de l'atmosphère ?",
    { a: "Oxygène", b: "Dioxyde de carbone", c: "Azote", d: "Hydrogène" },
    "b"
  ),
  new Question(
    "Qui a écrit la pièce 'Roméo et Juliette' ?",
    {
      a: "Charles Dickens",
      b: "William Shakespeare",
      c: "Jane Austen",
      d: "F. Scott Fitzgerald",
    },
    "b"
  ),
];

document.addEventListener("DOMContentLoaded", () => {
  const quiz = new Quiz(questions);
});
