export class RoundNumber {
  constructor(props = {}) {
    this.number = props.number;
  }

  updateProps(props = {}) {
    if (props.number !== undefined) {
      this.number = props.number;
    }

    this.render();
  }

  onMount() {
    this.render();
  }

  onUnmount() {}

  render() {
    const number = this.number ?? "?";
    document.getElementById("round-number").textContent = `Раунд ${number}`;
  }
}
