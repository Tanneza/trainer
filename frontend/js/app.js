import { Component } from "./component.js";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  root() {
    return document.getElementById("app");
  }

  async render() {
    const html = await fetch("html/app.html");
    return await html.text();
  }
}
