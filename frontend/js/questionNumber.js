export class QuestionNumber {
  constructor(props = {}) {
    this.number = props.number;
    this.count = props.count;
  }

  updateProps(props = {}) {
    if (props.number !== undefined) {
      this.number = props.number;
    }

    if (props.count !== undefined) {
      this.count = props.count;
    }

    this.render();
  }

  onMount() {
    this.render();
  }

  onUnmount() {}

  render() {
    const number = this.number ?? "?";
    const count = this.count ?? "?";
    document.getElementById("question-number").textContent = `Вопрос ${number} из ${count}`;
  }
}
