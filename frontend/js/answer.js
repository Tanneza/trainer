export class Answer {
  constructor(props = {}) {
    this.onAnswer = props.onAnswer;

    this.onSendAnswerButton = this.onSendAnswerButton.bind(this);
    this.onKeyDownInput = this.onKeyDownInput.bind(this);
  }

  updateProps(props = {}) {
    if (props.onAnswer !== undefined) {
      this.onAnswer = props.onAnswer;
    }

    this.render();
  }

  async onMount() {
    document.getElementById("send-answer-button").addEventListener("click", this.onSendAnswerButton);
    document.getElementById("answer-input").addEventListener("keydown", this.onKeyDownInput);

    this.disableAnswerInput();
    this.disableSendAnswerButton();

    this.render();
  }

  onUnmount() {
    document.getElementById("send-answer-button").removeEventListener("click", this.onSendAnswerButton);
    document.getElementById("answer-input").removeEventListener("keydown", this.onKeyDownInput);
  }

  render() {}

  async onSendAnswerButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка отправки ответа");

    this.handleAnswer();
  }

  async onKeyDownInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      console.log("Нажата клавиша Enter в поле ответа");

      this.handleAnswer();
    }
  }

  handleAnswer() {
    const userAnswer = document.getElementById("answer-input").value;

    typeof this.onAnswer === "function" && this.onAnswer(userAnswer);
  }

  clearAnswerInput() {
    document.getElementById("answer-input").value = "";
  }

  focusAnswerInput() {
    document.getElementById("answer-input").focus();
  }

  enableAnswerInput() {
    document.getElementById("answer-input").removeAttribute("disabled");
  }

  disableAnswerInput() {
    document.getElementById("answer-input").setAttribute("disabled", "disabled");
  }

  enableSendAnswerButton() {
    document.getElementById("send-answer-button").classList.remove("disabled");
  }

  disableSendAnswerButton() {
    document.getElementById("send-answer-button").classList.add("disabled");
  }
}
