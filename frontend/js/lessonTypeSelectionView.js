export class LessonTypeSelectionView {
  constructor(props = {}) {
    this.onStartLesson = props.onStartLesson;

    this.onStartLessonHanziToneButton = this.onStartLessonHanziToneButton.bind(this);
    this.onStartLessonPynyinToneButton = this.onStartLessonPynyinToneButton.bind(this);
    this.onStartLessonHanziTranslationButton = this.onStartLessonHanziTranslationButton.bind(this);
    this.onStartLessonPynyinTranslationButton = this.onStartLessonPynyinTranslationButton.bind(this);
  }

  updateProps(props = {}) {
    if (props.onStartLesson !== undefined) {
      this.onStartLesson = props.onStartLesson;
    }
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

  show() {
    const el = document.getElementById("lesson-type-selection-screen");
    el.style.display = "block";

    this.onMount();
  }

  hide() {
    const el = document.getElementById("lesson-type-selection-screen");
    el.style.display = "none";

    this.onUnmount();
  }

  onStartLessonHanziToneButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Кандзи - Тоны");

    typeof this.onStartLesson === "function" && this.onStartLesson("tone_hanzi");
  }

  onStartLessonPynyinToneButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Пиньинь - Тоны");

    typeof this.onStartLesson === "function" && this.onStartLesson("tone_pinyin");
  }

  onStartLessonHanziTranslationButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Кандзи - Перевод");

    typeof this.onStartLesson === "function" && this.onStartLesson("translation_hanzi");
  }

  onStartLessonPynyinTranslationButton(e) {
    e.preventDefault();

    console.log("Нажата кнопка начало урока Пиньинь - Перевод");

    typeof this.onStartLesson === "function" && this.onStartLesson("translation_pinyin");
  }
}
