export class QuestionNumber {
  constructor(props) {
    this.number = props.number;
    this.count = props.count;
  }

  updateProps(props) {
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
    document.getElementById("question-number").textContent = `Вопрос ${this.number} из ${this.count}`;
  }
}
