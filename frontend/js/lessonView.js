import { Answer } from "./answer.js";
import { Component } from "./component.js";
import { notifications } from "./notifications.js";
import { Question } from "./question.js";
import { QuestionNumber } from "./questionNumber.js";
import { RoundNumber } from "./roundNumber.js";
import * as backendApi from "./backendApi.js";
import { viewManager } from "./viewManager.js";

export class LessonView extends Component {
  constructor(props) {
    super(props);

    this.questionType = props?.questionType;

    this.questionsList = null;
    this.mistakesList = null;
    this.currentRoundNumber = null;
    this.currentQuestionNumber = null;
    this.currentQuestionId = null;
    this.questionsCount = null;

    this.roundNumberComponent = new RoundNumber();
    this.questionNumberComponent = new QuestionNumber();
    this.questionComponent = new Question();
    this.answerComponent = new Answer({ onAnswer: this.onAnswer.bind(this) });
  }

  root() {
    return document.getElementById("view");
  }

  async render() {
    const response = await fetch("html/lesson.html");
    const html = await response.text();
    return html;
  }

  updateProps(props) {
    if (props.questionType !== undefined) {
      this.questionType = props.questionType;
    }

    super.updateProps(props);
  }

  onMount() {
    this.roundNumberComponent.mount();
    this.questionNumberComponent.mount();
    this.questionComponent.mount();
    this.answerComponent.mount();

    this.startLesson();
  }

  onUnmount() {
    this.roundNumberComponent.unmount();
    this.questionNumberComponent.unmount();
    this.questionComponent.unmount();
    this.answerComponent.unmount();
  }

  async startLesson() {
    console.log("Пользователь начал урок");

    const { question_ids: questionIds } = await backendApi.startLesson(this.questionType);
    this.questionsList = questionIds;

    if (this.hasQuestions()) {
      this.currentRoundNumber = 1;

      await this.startRound();
    } else {
      await this.finishLesson();
    }
  }

  async finishLesson() {
    console.log("Пользователь завершил урок");

    viewManager.push({ name: "lesson-stats" });
  }

  async startRound() {
    console.log(`Пользователь начал раунд ${this.currentRoundNumber}`);

    this.roundNumberComponent.updateProps({ number: this.currentRoundNumber });

    console.log(`Список ID вопросов: [${this.questionsList}]`);

    this.mistakesList = [];
    this.currentQuestionNumber = 1;
    this.questionsCount = this.questionsList.length;

    await this.startQuestion();
  }

  async finishRound() {
    console.log("Пользователь завершил раунд");

    if (this.hasMistakes()) {
      console.log("Список ошибок не пуст");

      this.questionsList = this.mistakesList;

      ++this.currentRoundNumber;

      notifications.add({
        text: `Раунд ${this.currentRoundNumber}. Поработаем над ошибками!`,
        type: "warning",
      });

      await this.startRound();
    } else {
      console.log("Список ошибок пуст");

      await this.finishLesson();
    }
  }

  async startQuestion() {
    console.log(`Пользователь начал вопрос ${this.currentQuestionNumber}`);

    this.questionNumberComponent.updateProps({
      number: this.currentQuestionNumber,
      count: this.questionsCount,
    });

    this.currentQuestionId = this.questionsList.shift();

    console.log(`ID вопроса: ${this.currentQuestionId}`);

    const { html: questionHTML } = await backendApi.getQuestionById(this.currentQuestionId);

    console.log(`HTML вопроса:\n${questionHTML}`);

    this.questionComponent.updateProps({ html: questionHTML });

    this.answerComponent.enableAnswerInput();
    this.answerComponent.clearAnswerInput();
    this.answerComponent.focusAnswerInput();
    this.answerComponent.enableSendAnswerButton();
  }

  async finishQuestion() {
    console.log("Пользователь завершил вопрос");

    if (this.hasQuestions()) {
      console.log("Список вопросов не пуст");

      ++this.currentQuestionNumber;

      await this.startQuestion();
    } else {
      console.log("Список вопросов пуст");

      await this.finishRound();
    }
  }

  hasQuestions() {
    return this.questionsList.length > 0;
  }

  hasMistakes() {
    return this.mistakesList.length > 0;
  }

  async onAnswer(userAnswer) {
    console.log(`Ответ пользователя: "${userAnswer}"`);

    if (userAnswer) {
      this.answerComponent.disableAnswerInput();
      this.answerComponent.disableSendAnswerButton();

      const { result: checkResult, mistake_details: mistakeDetails } = await backendApi.checkAnswer(this.currentQuestionId, userAnswer);

      console.log(`Результат проверки ответа: ${checkResult}`);

      if (checkResult === true) {
        notifications.add({
          text: `(${this.currentRoundNumber}.${this.currentQuestionNumber}) Правильно!`,
        });
      } else {
        notifications.add({
          text: `(${this.currentRoundNumber}.${this.currentQuestionNumber}) Неправильно. ${mistakeDetails}`,
          type: "warning",
        });

        this.mistakesList.push(this.currentQuestionId);
      }

      await this.finishQuestion();
    } else {
      console.warn("Поле для ввода ответа пустое");
    }
  }
}
