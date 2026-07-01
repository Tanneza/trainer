import { Component } from "./component.js";

export class RoundNumber extends Component {
  constructor(props) {
    super(props);

    this.number = props?.number;
  }

  updateProps(props) {
    if (props?.number !== undefined) {
      this.number = props.number;
    }

    super.updateProps(props);
  }

  root() {
    return document.getElementById("round-number");
  }

  async render() {
    const number = this.number ?? "?";
    return `Раунд ${number}`;
  }
}
