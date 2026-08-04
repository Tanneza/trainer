import { Component } from "./component.js";
import { viewManager } from "./viewManager.js";
import * as backendApi from "./backendApi.js";

export class MainView extends Component {
  constructor(props) {
    super(props);

    this.lessonTypes = [];
    this.listeners = [];
  }

  root() {
    return document.getElementById("view");
  }

  async render() {
    const response = await fetch("html/main.html");
    const html = await response.text();
    return html;
  }

  onMount() {
    this.loadPhraseOfDay();
    this.loadLessonTypes();
  }

  onUnmount() {
    this.listeners.forEach((l) => l.element.removeEventListener("click", l.func));
  }

  async loadPhraseOfDay() {
    const phraseOfDay = await backendApi.getPhraseOfDay();
    const container = document.getElementById("phrase-of-day");
    container.innerHTML = phraseOfDay;
  }

  async loadLessonTypes() {
    const response = await backendApi.getLessonTypes();
    this.lessonTypes = response["lesson_types"];

    this.createButtons();
  }

  createButtons() {
    const container = document.getElementById("lesson-types-list");
    this.listeners = [];

    for (const type of this.lessonTypes) {
      const linkElem = document.createElement("a");
      linkElem.textContent = type.title;
      linkElem.dataset.lessonType = type.code;
      linkElem.classList.add("btn", "btn-primary");
      linkElem.href = "javascript:void(0)";

      const listener = { element: linkElem, func: (e) => this.onStartLesson(e, type.code) };
      this.listeners.push(listener);
      linkElem.addEventListener("click", listener.func);

      container.appendChild(linkElem);
    }
  }

  onStartLesson(e) {
    e.preventDefault();

    const linkElem = e.target;

    console.log(`Нажата кнопка начала урока: ${linkElem.textContent}`);

    viewManager.push({ name: "lesson", props: { questionType: linkElem.dataset.lessonType } });
  }
}
