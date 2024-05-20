import cieRgbColorConverter from 'https://cdn.skypack.dev/cie-rgb-color-converter';

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
    window.removeEventListener('appdataloaded', this.handleAppDataLoaded);
  }

  render() {
    const template = document.getElementById('button-panel-template');
    const content = template.content.cloneNode(true);
    const lights = app.store.lights;

    for (const key in lights) {
      if (lights.hasOwnProperty(key)) {
        const light = lights[key];
        const state = light.state;

        const rgb = cieRgbColorConverter.xyBriToRgb(
          state.xy[0],
          state.xy[0],
          state.bri
        );

        const lightButton = document.createElement('light-button');
        lightButton.setAttribute('lightID', key);
        lightButton.setAttribute('lightName', light.name);
        lightButton.setAttribute('lightState', JSON.stringify(light.state));
        lightButton.setAttribute(
          'lightColor',
          `#${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`
        );
        content.appendChild(lightButton);
      }
    }
    this.innerHTML = '';
    this.appendChild(content);
  }
}

customElements.define('button-panel', ButtonPanel);
