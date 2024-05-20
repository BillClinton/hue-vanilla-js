import Store from './services/Store.js';
import { loadData } from './services/Lights.js';

// Set up app object
window.app = {};
app.store = Store;

// Link web components
import LightButton from './components/LightButton.js';
import ButtonPanel from './components/ButtonPanel.js';

window.addEventListener('DOMContentLoaded', () => {
  loadData();
});
