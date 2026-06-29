import { startLesson as APIStartLesson } from "./api.js";
import { Question } from "./question.js";
import { QuestionNumber } from "./questionNumber.js";

export class Trainer {
  constructor(props) {
    this.questionType = props.questionType;

    this.questionsList = [];
    this.mistakesList = null;
    this.currentQuestionNumber = null;
    this.questionsCount = null;
    this.questionNumberComponent = null;
    this.questionComponent = null;
  }

  async startLesson() {
    console.log("Пользователь начал урок");

    this.questionsList = await APIStartLesson(this.questionType);

    this.questionNumberComponent = new QuestionNumber();
    this.questionComponent = new Question({
      onCorrectAnswer: () => {
        alert("Правильно!");
      },
      onIncorrectAnswer: (mistake_id) => {
        alert("Неправильно!");

        this.mistakesList.push(mistake_id);
      },
      onAnyAnswer: () => {
        this.finishQuestion();
      },
    });

    this.questionNumberComponent.onMount();
    this.questionComponent.onMount();

    this.startRound();
  }

  finishLesson() {
    console.log("Пользователь завершил урок");

    this.questionComponent.disableSendAnswerButton();
    this.questionComponent.disableAnswerInput();

    this.questionNumberComponent.onUnmount();
    this.questionComponent.onUnmount();
  }

  startRound() {
    console.log("Пользователь начал раунд");

    console.log(`Список ID вопросов: [${this.questionsList}]`);

    this.mistakesList = [];

    if (this.hasQuestions()) {
      console.log("Список вопросов не пуст");

      this.currentQuestionNumber = 1;
      this.questionsCount = this.questionsList.length;

      this.startQuestion();
    } else {
      console.log("Список вопросов пуст");

      this.finishRound();
    }
  }

  finishRound() {
    console.log("Пользователь завершил раунд");

    if (this.hasMistakes()) {
      console.log("Список ошибок не пуст");

      this.questionsList = this.mistakesList;

      this.startRound();
    } else {
      console.log("Список ошибок пуст");

      this.finishLesson();
    }
  }

  startQuestion() {
    console.log("Пользователь начал вопрос");

    console.log(`Номер вопроса: ${this.currentQuestionNumber}`);

    this.questionNumberComponent.updateProps({
      number: this.currentQuestionNumber,
      count: this.questionsCount,
    });

    const questionId = this.questionsList.shift();

    console.log(`ID вопроса: ${questionId}`);

    this.questionComponent.updateProps({ id: questionId });

    this.questionComponent.clearAnswerInput();
    this.questionComponent.enableAnswerInput();
    this.questionComponent.focusAnswerInput();
  }

  finishQuestion() {
    console.log("Пользователь завершил вопрос");

    if (this.hasQuestions()) {
      console.log("Список вопросов не пуст");

      ++this.currentQuestionNumber;

      this.startQuestion();
    } else {
      console.log("Список вопросов пуст");

      this.finishRound();
    }
  }

  hasQuestions() {
    return this.questionsList.length > 0;
  }

  hasMistakes() {
    return this.mistakesList.length > 0;
  }
}
