import { startLesson as APIStartLesson } from "./api.js";
import { Question } from "./question.js";
import { QuestionNumber } from "./questionNumber.js";

var questionsList = [];
var nextQuestionIndex = 0;
var questionNumber = null;
var question = null;

async function init() {
  const questionType = "tone_hanzi";
  await startLesson(questionType);
}

async function startLesson(questionType) {
  console.log("Пользователь начал урок");

  questionsList = await APIStartLesson(questionType);

  console.log(`Список ID вопросов: [${questionsList}]`);

  nextQuestionIndex = 0;

  console.log(`Индекс вопроса: ${nextQuestionIndex}`);

  if (hasNextQuestion()) {
    questionNumber = new QuestionNumber({
      number: nextQuestionIndex + 1,
      count: questionsList.length,
    });
    questionNumber.onMount();

    const questionId = questionsList[nextQuestionIndex];

    console.log(`ID вопроса: ${questionId}`);

    question = new Question({
      id: questionId,
      onCorrectAnswer: () => {
        alert("Правильно!");

        if (hasNextQuestion()) {
          askNextQuestion();
        } else {
          finishLesson();
        }
      },
      onIncorrectAnswer: () => {
        alert("Неправильно!");

        if (hasNextQuestion()) {
          askNextQuestion();
        } else {
          finishLesson();
        }
      },
    });
    question.onMount();

    ++nextQuestionIndex;
  }
}

function finishLesson() {
  console.log("Пользователь завершил урок");

  question.disableAnswerInput();
  question.disableSendAnswerButton();

  questionNumber.onUnmount();
  question.onUnmount();
}

function hasNextQuestion() {
  return nextQuestionIndex < questionsList.length;
}

function askNextQuestion() {
  console.log(`Индекс вопроса: ${nextQuestionIndex}`);

  questionNumber.updateProps({ number: nextQuestionIndex + 1 });

  const questionId = questionsList[nextQuestionIndex];

  console.log(`ID вопроса: ${questionId}`);

  question.updateProps({ id: questionId });
  question.clearAnswerInput();
  question.focusAnswerInput();

  ++nextQuestionIndex;
}

init();
