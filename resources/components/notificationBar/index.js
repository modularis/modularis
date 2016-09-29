import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

export default class NotificationBar extends Component {
  domEvents() {
    this.dom.el.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`c-notification-bar__close`)) {
        e.preventDefault();

        const $notification = e.target.parentNode;
        $notification.classList.add(`do-hide`);
        const notification = {
          id: parseInt($notification.dataset.key, 10)
        };
        this.remove(notification);
      }
    });
  }

  add(notification) {
    notification.id = notification.id || Math.floor(Math.random() * 900000) + 100000;
    notification.show = true;
    setTimeout(() => (notification.show = false), 800);
    this.data.items.push(notification);
    this.render();
  }

  remove(notification) {
    this.data.items = this.data.items.filter((x) => x.id !== notification.id);

    setTimeout(() => (this.render()), 800);
  }
}

app.registerComponent(NotificationBar, `components/notificationBar/views/main`);
