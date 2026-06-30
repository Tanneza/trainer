export class NotificationArea {
  constructor(props = {}) {
    this.notifications = props.notifications ?? [];
    this.autoRemoveTimeout = props.autoRemoveTimeout ?? 15000;
  }

  updateProps(props = {}) {
    if (props.notifications !== undefined) {
      this.notifications = props.notifications;
    }

    if (props.autoRemoveTimeout !== undefined) {
      this.autoRemoveTimeout = props.autoRemoveTimeout;
    }

    this.render();
  }

  onMount() {
    this.render();
  }

  onUnmount() {}

  add(notification) {
    notification.id = notification.id ?? crypto.randomUUID();

    setTimeout(() => {
      this.remove(notification.id);
    }, this.autoRemoveTimeout);

    this.notifications.push(notification);

    this.render();

    return notification.id;
  }

  remove(notificationId) {
    const index = this.notifications.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }

    this.render();
  }

  async render() {
    let html = '<ul class="list-unstyled fs-3 d-flex flex-column gap-2 align-items-end">';

    for (let i = 0; i < this.notifications.length; ++i) {
      const notification = this.notifications[i];
      html += `<li class="badge ${notification.type === "warning" ? "bg-warning" : "bg-info"} text-dark rounded-3 shadow p-3">${notification.text}</li>`;
    }

    html += "</ul>";
    document.getElementById("notification-area").innerHTML = html;
  }
}
