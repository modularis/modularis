import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

export default class NotificationBar extends Component {
  domEvents() {
    this.dom.el.addEventListener('click', (e) => this.close(e));
  }

  add(notificationItem) {
    notificationItem.show = true;
    this.data.items.push(notificationItem);
    this.render();
  }

  close(e) {
    if (e.target.classList.contains('c-notification-bar__close')) {
      e.preventDefault();

      const $notification = e.target.parentNode;
      $notification.classList.add('do-hide');
      window.setTimeout(() => {
        $notification.remove();
      }, 2000);
    }
  }
}

app.registerComponent(NotificationBar, 'components/notificationBar/views/main');
