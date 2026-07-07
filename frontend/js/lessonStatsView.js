import { Component } from "./component.js";
import { StringTemplate } from "./stringTemplate.js";

export class LessonStatsView extends Component {
  constructor(props) {
    super(props);

    this.questionsCount = props?.questionsCount;
    this.correctAnswersCount = props?.correctAnswersCount;
    this.correctAnswersRate = props?.correctAnswersRate;
    this.roundsCount = props?.roundsCount;
  }

  root() {
    return document.getElementById("view");
  }

  async render() {
    const response = await fetch("html/lesson-stats.html");
    const htmlTemplate = await response.text();

    return new StringTemplate(htmlTemplate).fill({
      questionsCount: this.questionsCount,
      correctAnswersCount: this.correctAnswersCount,
      correctAnswersRate: `${(100 * this.correctAnswersRate).toFixed(1)}%`,
      roundsCount: this.roundsCount,
    });
  }
}
