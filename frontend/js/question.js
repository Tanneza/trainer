import { Component } from "./component.js";

export class Question extends Component {
  constructor(props) {
    super(props);

    this.html = props?.html;
  }

  async updateProps(props) {
    if (props?.html !== undefined) {
      this.html = props.html;
    }

    super.updateProps(props);
  }

  root() {
    return document.getElementById("question-html");
  }

  async render() {
    return this.html;
  }
}
