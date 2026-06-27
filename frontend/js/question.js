import { getQuestionById as APIGetQuestionById, checkAnswer as APICheckAnswer } from "./api.js";

export class Question {
  constructor(props) {
    this.id = props.id;
    this.onCorrectAnswer = props.onCorrectAnswer;
    this.onIncorrectAnswer = props.onIncorrectAnswer;

    this.onSendAnswer = this.onSendAnswer.bind(this);
  }

  async updateProps(props) {
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

    this.render();
  }

  async onMount() {
    document.getElementById("send-answer-button").addEventListener("click", this.onSendAnswer);

    this.clearAnswerInput();
    this.focusAnswerInput();
    await this.loadHTML();

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
    e.preventDefault();

    console.log("Нажата кнопка отправки ответа");

    const userAnswer = document.getElementById("answer-input").value;

    console.log(`Ответ пользователя: "${userAnswer}"`);

    if (!userAnswer) {
      console.warn("Поле для ввода ответа пустое");
      return;
    }

    const checkResult = await APICheckAnswer(this.id, userAnswer);

    console.log(`Результат проверки ответа: ${checkResult}`);

    if (checkResult === true) {
      typeof this.onCorrectAnswer === "function" && this.onCorrectAnswer();
    } else {
      typeof this.onIncorrectAnswer === "function" && this.onIncorrectAnswer();
    }
  }
}
