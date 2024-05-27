import Router from './services/Router.js';
import Store from './services/Store.js';
import { loadData } from './services/Lights.js';

// Set up app object
window.app = {};
app.router = Router;
app.store = Store;

// Link web components
import LightButton from './components/LightButton.js';
import LightsPanel from './components/LightsPanel.js';
import RoomsPanel from './components/RoomsPanel.js';

window.addEventListener('DOMContentLoaded', () => {
  app.router.init();
  loadData();
});
