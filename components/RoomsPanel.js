export default class RoomsPanel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.addEventListener('appdataloaded', this.render.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('appdataloaded', this.render.bind(this));
  }

  render() {
    const template = document.getElementById('button-panel-template');
    const content = template.content.cloneNode(true);
    const rooms = app.store.rooms;

    console.log(rooms);

    if (rooms && Object.keys(rooms).length > 0) {
      for (const key in rooms) {
        if (rooms.hasOwnProperty(key)) {
          const room = rooms[key];
          const lightButton = document.createElement('light-button');

          if (room.type === 'Room') {
            console.log('room', room.name, room.type);
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            h2.innerText = room.name;
            div.appendChild(h2);

            const ul = document.createElement('ul');
            if (room.lights) {
              for (const lightID of room.lights) {
                const li = document.createElement('li');
                const lightButton = document.createElement('light-button');
                console.log('lightID', lightID);
                console.log(app.store.getLight(lightID));
                lightButton.setLight(app.store.getLight(lightID));
                li.appendChild(lightButton);
                ul.appendChild(li);
                div.appendChild(ul);
              }
            }
            content.appendChild(div);
          }
        }
      }
    } else {
      const message = document.createElement('p');
      message.innerText = 'No lights found';
      content.appendChild(message);
    }
    this.innerHTML = '';
    this.appendChild(content);
  }
}

customElements.define('rooms-panel', RoomsPanel);
