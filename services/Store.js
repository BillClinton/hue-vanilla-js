const Store = {
  lights: {},
  rooms: {},

  getLight: (lightID) => {
    return app.store.lights[lightID] || null;
  },
};

const proxyStore = new Proxy(Store, {
  set(target, prop, value) {
    target[prop] = value;
    if (prop === 'lights') {
      window.dispatchEvent(new Event('appdataloaded'));
    }
    if (prop === 'rooms') {
      window.dispatchEvent(new Event('appdataloaded'));
    }
    return true;
  },
});

export default proxyStore;
