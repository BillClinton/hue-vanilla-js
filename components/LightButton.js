import { setOnState } from '../services/Lights.js';

export default class LightButton extends HTMLElement {
  constructor() {
    super();

    // open mode allow external access to inner dom
    this.root = this.attachShadow({ mode: 'open' });
  }

  // called when component is attached to DOM
  connectedCallback() {
    const template = document.getElementById('light-button-template');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const button = this.root.querySelector('button');
    const state = JSON.parse(this.getAttribute('lightState'));

    button.addEventListener('click', (event) => {
      setOnState(this.getAttribute('lightID'), !state.on);
    });

    this.render();
  }

  render() {
    const button = this.root.querySelector('button');
    const picker = this.root.querySelector('input[type=color]');
    const name = this.getAttribute('lightName');
    const state = JSON.parse(this.getAttribute('lightState'));

    button.innerText = name + ' : ' + (state.on ? 'on' : 'off');
    picker.value = this.getAttribute('lightColor');
  }
}

customElements.define('light-button', LightButton);
