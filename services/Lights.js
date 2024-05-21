import API from './API.js';

export async function loadData() {
  await API.fetchLights();
}

export async function setOnState(lightID, on = true) {
  await API.setOnState(lightID, on);
}

export async function setColorState(
  lightID,
  color,
  modelID,
  updateStore = true
) {
  await API.setColorState(lightID, color, modelID, updateStore);
}
