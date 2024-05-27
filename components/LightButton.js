import { setOnState, setColorState } from '../services/Lights.js';
import { convertRGBToHex, convertXYToRGB } from '../services/Util.js';

export default class LightButton extends HTMLElement {
  light;

  constructor() {
    super();

    // open mode allow external access to inner dom
    this.root = this.attachShadow({ mode: 'open' });
  }

  setLight(light) {
    this.light = light;

    const state = light.state;
    const color = convertXYToRGB(state.xy[0], state.xy[1], state.bri);

    this.setAttribute('lightID', light.ID);
    this.setAttribute('lightName', light.name);
    this.setAttribute('lightModelID', light.modelid);
    this.setAttribute('lightState', JSON.stringify(light.state));
    this.setAttribute('lightColor', color);
  }

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
    if (this.light) {
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
}

customElements.define('light-button', LightButton);
