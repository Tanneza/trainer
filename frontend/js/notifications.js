import { Component } from "./component.js";

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.autoRemoveTimeout = props?.autoRemoveTimeout ?? 15000;

    this.notifications = [];
  }

  updateProps(props) {
    if (props?.autoRemoveTimeout !== undefined) {
      this.autoRemoveTimeout = props.autoRemoveTimeout;
    }

    super.updateProps(props);
  }

  async add(notification) {
    notification.id = notification.id ?? crypto.randomUUID();

    setTimeout(() => {
      this.remove(notification.id);
    }, this.autoRemoveTimeout);

    this.notifications.push(notification);
    this.updateProps();

    return notification.id;
  }

  remove(notificationId) {
    const index = this.notifications.findIndex((n) => n.id === notificationId);

    if (index !== -1) {
      this.notifications.splice(index, 1);
      this.updateProps();
    }
  }

  root() {
    return document.getElementById("notifications");
  }

  async render() {
    let html = '<ul class="list-unstyled fs-3 d-flex flex-column gap-2 align-items-end">';

    for (let i = 0; i < this.notifications.length; ++i) {
      const notification = this.notifications[i];
      html += `<li class="badge ${notification.type === "warning" ? "bg-warning" : "bg-info"} text-dark rounded-3 shadow p-3">${notification.text}</li>`;
    }

    html += "</ul>";

    return html;
  }
}

export const notifications = new Notifications();
