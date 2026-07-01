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
    const root = this.root();

    if (root) {
      root.innerHTML = await this.render();
    }

    this.onMount();
  }

  unmount() {
    this.onUnmount();

    const root = this.root();

    if (root) {
      root.innerHTML = null;
    }
  }

  onMount() {}

  onUnmount() {}
}
