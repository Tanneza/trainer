import { Component } from "./component.js";
import { viewManager } from "./viewManager.js";

export class LessonTypeSelectionView extends Component {
  constructor(props) {
    super(props);

    this.onStartLessonHanziToneButton = this.onStartLessonHanziToneButton.bind(this);
    this.onStartLessonPynyinToneButton = this.onStartLessonPynyinToneButton.bind(this);
    this.onStartLessonHanziTranslationButton = this.onStartLessonHanziTranslationButton.bind(this);
    this.onStartLessonPynyinTranslationButton = this.onStartLessonPynyinTranslationButton.bind(this);
  }

  root() {
    return document.getElementById("lesson-type-selection");
  }

  async render() {
    const response = await fetch("html/lessonTypeSelection.html");
    const html = await response.text();
    return html;
  }

  onMount() {
    document.getElementById("start-lesson-hanzi-tone-button").addEventListener("click", this.onStartLessonHanziToneButton);
    document.getElementById("start-lesson-pynyin-tone-button").addEventListener("click", this.onStartLessonPynyinToneButton);
    document.getElementById("start-lesson-hanzi-translation-button").addEventListener("click", this.onStartLessonHanziTranslationButton);
    document.getElementById("start-lesson-pynyin-translation-button").addEventListener("click", this.onStartLessonPynyinTranslationButton);
  }

  onUnmount() {
    document.getElementById("start-lesson-hanzi-tone-button").removeEventListener("click", this.onStartLessonHanziToneButton);
    document.getElementById("start-lesson-pynyin-tone-button").removeEventListener("click", this.onStartLessonPynyinToneButton);
    document.getElementById("start-lesson-hanzi-translation-button").removeEventListener("click", this.onStartLessonHanziTranslationButton);
    document.getElementById("start-lesson-pynyin-translation-button").removeEventListener("click", this.onStartLessonPynyinTranslationButton);
  }

  onStartLessonHanziToneButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Кандзи - Тоны");

    this.onStartLesson("tone_hanzi");
  }

  onStartLessonPynyinToneButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Пиньинь - Тоны");

    this.onStartLesson("tone_pinyin");
  }

  onStartLessonHanziTranslationButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Кандзи - Перевод");

    this.onStartLesson("translation_hanzi");
  }

  onStartLessonPynyinTranslationButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Пиньинь - Перевод");

    this.onStartLesson("translation_pinyin");
  }

  onStartLesson(questionType) {
    viewManager.push({ name: "lesson", props: { questionType } });
  }
}
