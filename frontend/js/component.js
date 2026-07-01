export class Component {
  updateProps(props) {
    this.mount();
  }

  root() {
    return null;
  }

  async render() {
    return "";
  }

  async mount() {
    this.root().innerHTML = await this.render();
    this.onMount();
  }

  unmount() {
    this.onUnmount();
    this.root().innerHTML = null;
  }

  onMount() {}

  onUnmount() {}
}
