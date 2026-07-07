import { Component } from "./component.js";

export class LessonStatsView extends Component {
  constructor(props) {
    super(props);
  }

  root() {
    return document.getElementById("view");
  }

  async render() {
    const response = await fetch("html/lesson-stats.html");
    const html = await response.text();
    return html;
  }
}
