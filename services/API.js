const API = {
  domain: 'http://192.168.1.164', // the local IP address of your Hue bridge
  token: 'xxx', // put your token here
  path: '/lights',

  fetchLights: async () => {
    const result = await fetch(`${API.domain}/api/${API.token}${API.path}`);
    const response = await result.json();
    if (response[0]?.error) {
      console.warn(
        `error communicating with Hue bridge: ${response[0].error.description}`
      );
    } else {
      app.store.lights = response;
    }
  },

  setOnState: async (lightID, on = true) => {
    const result = await fetch(
      `${API.domain}/api/${API.token}${API.path}/${lightID}/state`,
      {
        method: 'PUT',
        body: JSON.stringify({ on: on }),
      }
    );
    const response = await result.json();
    const onState = response[0].success[`/lights/${lightID}/state/on`];

    const lights = app.store.lights;
    for (const key in lights) {
      if (lights.hasOwnProperty(key)) {
        if (key === lightID) {
          lights[key].state.on = onState;
        }
      }
    }
    app.store.lights = lights;
  },
};

export default API;
