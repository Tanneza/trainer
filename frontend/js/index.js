import { startLesson as APIStartLesson } from "./api.js";
import { Question } from "./question.js";
import { QuestionNumber } from "./questionNumber.js";

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

  console.log(`Индекс вопроса: ${currentQuestionIndex}`);

  const questionNumber = new QuestionNumber({
    number: currentQuestionIndex + 1,
    count: questionsList.length,
  });
  questionNumber.onMount();

  const questionId = questionsList[currentQuestionIndex];

  console.log(`ID вопроса: ${questionId}`);

  const question = new Question({ id: questionId });
  question.onMount();
}

init();
