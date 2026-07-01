import { Component } from "./component.js";

export class QuestionNumber extends Component {
  constructor(props) {
    super(props);

    this.number = props?.number;
    this.count = props?.count;
  }

  updateProps(props) {
    if (props?.number !== undefined) {
      this.number = props.number;
    }

    if (props?.count !== undefined) {
      this.count = props.count;
    }

    super.updateProps(props);
  }

  root() {
    return document.getElementById("question-number");
  }

  async render() {
    const number = this.number ?? "?";
    const count = this.count ?? "?";
    return `Вопрос ${number} из ${count}`;
  }
}
