export default class LightsPanel extends HTMLElement {
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
    const lights = app.store.lights;

    if (lights && Object.keys(lights).length > 0) {
      for (const key in lights) {
        if (lights.hasOwnProperty(key)) {
          const light = lights[key];
          const lightButton = document.createElement('light-button');

          light.ID = key;
          lightButton.setLight(light);
          content.appendChild(lightButton);
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

customElements.define('lights-panel', LightsPanel);
