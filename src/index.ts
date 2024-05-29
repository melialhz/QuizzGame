import { Question } from "./question";
import { Quiz } from "./quizz";
import "./background";

const questions: Question[] = [
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
    { a: "Ottawa", b: "Toronto", c: "Vancouver", d: "Montreal" },
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
  new Question(
    "Quelle est la plus grande planète du système solaire ?",
    { a: "Mars", b: "Terre", c: "Jupiter", d: "Saturne" },
    "c"
  ),
  new Question(
    "Quelle est la formule chimique de l'eau ?",
    { a: "CO2", b: "H2O", c: "O2", d: "H2" },
    "b"
  ),
  new Question(
    "Quel est l'organe principal du système circulatoire ?",
    { a: "Poumon", b: "Cerveau", c: "Rein", d: "Cœur" },
    "d"
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
    "Combien de continents y a-t-il sur Terre ?",
    { a: "5", b: "6", c: "7", d: "8" },
    "c"
  ),
];

document.addEventListener("DOMContentLoaded", () => {
  const quiz = new Quiz(questions);
});
