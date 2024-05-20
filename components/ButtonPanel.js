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
    console.log(lights);

    for (const key in lights) {
      if (lights.hasOwnProperty(key)) {
        const light = lights[key];

        const lightButton = document.createElement('light-button');
        lightButton.setAttribute('lightID', key);
        lightButton.setAttribute('lightName', light.name);
        lightButton.setAttribute('lightState', JSON.stringify(light.state));
        content.appendChild(lightButton);
      }
    }
    this.innerHTML = '';
    this.appendChild(content);
  }
}

customElements.define('button-panel', ButtonPanel);
