import API from './API.js';

export async function loadData() {
  await API.fetchLights();
}

export async function setOnState(lightID, on = true) {
  await API.setOnState(lightID, on);
}
