import { Component } from "./component.js";
import { viewManager } from "./viewManager.js";
import { notifications } from "./notifications.js";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  root() {
    return document.getElementById("app");
  }

  async render() {
    const response = await fetch("html/app.html");
    const html = await response.text();
    return html;
  }

  async onMount() {
    viewManager.push({ name: "lesson-type-selection" });

    await notifications.mount();
  }
}
