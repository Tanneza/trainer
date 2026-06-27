import { getQuestionById as APIGetQuestionById, checkAnswer as APICheckAnswer } from "./api.js";

export class Question {
  constructor(props = {}) {
    this.id = props.id;
    this.onCorrectAnswer = props.onCorrectAnswer;
    this.onIncorrectAnswer = props.onIncorrectAnswer;
    this.onAnyAnswer = props.onAnyAnswer;

    this.html = "";
    this.onSendAnswer = this.onSendAnswer.bind(this);
  }

  async updateProps(props = {}) {
    if (props.id !== undefined) {
      this.id = props.id;
      await this.loadHTML();
    }

    if (props.onCorrectAnswer !== undefined) {
      this.onCorrectAnswer = props.onCorrectAnswer;
    }

    if (props.onIncorrectAnswer !== undefined) {
      this.onIncorrectAnswer = props.onIncorrectAnswer;
    }

    if (props.onAnyAnswer !== undefined) {
      this.onAnyAnswer = props.onAnyAnswer;
    }

    this.render();
  }

  async onMount() {
    document.getElementById("send-answer-button").addEventListener("click", this.onSendAnswer);

    this.clearAnswerInput();
    this.enableAnswerInput();
    this.focusAnswerInput();

    if (this.id !== undefined) {
      await this.loadHTML();
    }

    this.render();
  }

  onUnmount() {
    document.getElementById("send-answer-button").removeEventListener("click", this.onSendAnswer);
  }

  render() {
    document.getElementById("question-html").innerHTML = this.html;
  }

  clearAnswerInput() {
    document.getElementById("answer-input").value = "";
  }

  focusAnswerInput() {
    document.getElementById("answer-input").focus();
  }

  enableAnswerInput() {
    document.getElementById("answer-input").disabled = false;
  }

  disableAnswerInput() {
    document.getElementById("answer-input").disabled = true;
  }

  disableSendAnswerButton() {
    document.getElementById("send-answer-button").disabled = true;
  }

  async loadHTML() {
    const questionHTML = await APIGetQuestionById(this.id);

    console.log(`HTML вопроса:\n${questionHTML}`);

    this.html = questionHTML;
  }

  async onSendAnswer(e) {
    this.disableAnswerInput();

    e.preventDefault();

    console.log("Нажата кнопка отправки ответа");

    const userAnswer = document.getElementById("answer-input").value;

    console.log(`Ответ пользователя: "${userAnswer}"`);

    if (userAnswer) {
      const checkResult = await APICheckAnswer(this.id, userAnswer);

      console.log(`Результат проверки ответа: ${checkResult}`);

      if (checkResult === true) {
        typeof this.onCorrectAnswer === "function" && this.onCorrectAnswer(this.id);
      } else {
        typeof this.onIncorrectAnswer === "function" && this.onIncorrectAnswer(this.id);
      }

      typeof this.onAnyAnswer === "function" && this.onAnyAnswer(this.id);
    } else {
      console.warn("Поле для ввода ответа пустое");
    }

    this.enableAnswerInput();
  }
}
