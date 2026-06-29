export class LessonView {
  constructor(props = {}) {}

  updateProps(props = {}) {}

  show() {
    const el = document.getElementById("lesson-screen");
    el.style.display = "block";
  }

  hide() {
    const el = document.getElementById("lesson-screen");
    el.style.display = "none";
  }
}
