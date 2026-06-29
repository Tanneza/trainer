export class Question {
  constructor(props = {}) {
    this.html = props.html;
  }

  async updateProps(props = {}) {
    if (props.html !== undefined) {
      this.html = props.html;
    }

    this.render();
  }

  async onMount() {
    this.render();
  }

  onUnmount() {}

  render() {
    document.getElementById("question-html").innerHTML = this.html;
  }
}
