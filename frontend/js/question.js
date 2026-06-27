import { getQuestionById as APIGetQuestionById, checkAnswer as APICheckAnswer } from "./api.js";

export class Question {
  constructor(props) {
    this.id = props.id;
    this.onCorrectAnswer = props.onCorrectAnswer;
    this.onIncorrectAnswer = props.onIncorrectAnswer;

    this.onSendAnswer = this.onSendAnswer.bind(this);
  }

  async onMount() {
    document.getElementById("send-answer-button").addEventListener("click", this.onSendAnswer);

    document.getElementById("answer-input").value = "";
    await this.loadHTML();
    this.render();
  }

  onUnmount() {
    document.getElementById("send-answer-button").removeEventListener("click", this.onSendAnswer);
  }

  render() {
    document.getElementById("question-html").innerHTML = this.html;
  }

  async loadHTML() {
    const questionHTML = await APIGetQuestionById(this.id);

    console.log(`HTML вопроса: ${questionHTML}`);

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
