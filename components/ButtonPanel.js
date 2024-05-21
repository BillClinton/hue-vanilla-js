import { convertXYToRGB } from '../services/Util.js';

export default class ButtonPanel extends HTMLElement {
  constructor() {
    super();

    // open mode allow external access to inner  dom
    // this.root = this.attachShadow({ mode: 'closed' });
  }

  // called when component is attached to DOM
  connectedCallback() {
    // adding event listener
    window.addEventListener('appdataloaded', () => {
      this.render();
    });
  }

  disconnectedCallback() {
    window.removeEventListener('appdataloaded', () => {
      this.render();
    });
  }

  render() {
    const template = document.getElementById('button-panel-template');
    const content = template.content.cloneNode(true);
    const lights = app.store.lights;

    for (const key in lights) {
      if (lights.hasOwnProperty(key)) {
        const lightButton = document.createElement('light-button');
        const light = lights[key];
        const state = light.state;
        const color = convertXYToRGB(state.xy[0], state.xy[1], state.bri);

        lightButton.setAttribute('lightID', key);
        lightButton.setAttribute('lightName', light.name);
        lightButton.setAttribute('lightModelID', light.modelid);
        lightButton.setAttribute('lightState', JSON.stringify(light.state));
        lightButton.setAttribute('lightColor', color);

        content.appendChild(lightButton);
      }
    }
    this.innerHTML = '';
    this.appendChild(content);
  }
}

customElements.define('button-panel', ButtonPanel);
