import { startLesson as APIStartLesson } from "./api.js";
import { Question } from "./question.js";

var questionsList = [];
var currentQuestionIndex = 0;

async function init() {
  const questionType = "tone_hanzi";
  await startLesson(questionType);
}

async function startLesson(questionType) {
  questionsList = await APIStartLesson(questionType);

  console.log(`Список ID вопросов: [${questionsList}]`);

  currentQuestionIndex = 0;

  const questionNumber = currentQuestionIndex + 1;
  const questionsCount = questionsList.length;

  console.log(`Номер вопроса: ${questionNumber}`);
  console.log(`Количество вопросов ${questionsCount}`);

  document.getElementById("question-number").textContent = `Вопрос ${questionNumber} из ${questionsCount}`;

  const questionId = questionsList[currentQuestionIndex];

  console.log(`ID вопроса: ${questionId}`);

  const question = new Question({ id: questionId });
  question.onMount();
}

init();
