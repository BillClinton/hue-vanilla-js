import { setOnState, setColorState } from '../services/Lights.js';
import { convertRGBToHex } from '../services/Util.js';

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
    const picker = this.root.querySelector('input[type=color]');
    const state = JSON.parse(this.getAttribute('lightState'));

    button.addEventListener('click', (event) => {
      setOnState(this.getAttribute('lightID'), !state.on);
    });

    picker.addEventListener('input', (event) => {
      setColorState(
        this.getAttribute('lightID'),
        event.target.value,
        this.getAttribute('lightModelID'),
        false
      );
    });

    picker.addEventListener('change', (event) => {
      setColorState(
        this.getAttribute('lightID'),
        event.target.value,
        this.getAttribute('lightModelID')
      );
    });

    this.render();
  }

  render() {
    const wrapper = this.root.querySelector('.wrapper');
    const button = this.root.querySelector('button');
    const picker = this.root.querySelector('input[type=color]');
    const name = this.getAttribute('lightName');
    const state = JSON.parse(this.getAttribute('lightState'));
    const bg = convertRGBToHex(
      window.getComputedStyle(wrapper).getPropertyValue('background-color')
    );

    button.innerText = name + ' : ' + (state.on ? 'on' : 'off');
    if (state.on) {
      picker.removeAttribute('disabled');
      picker.value = this.getAttribute('lightColor');
    } else {
      picker.setAttribute('disabled', true);
      picker.value = bg;
    }
  }
}

customElements.define('light-button', LightButton);
