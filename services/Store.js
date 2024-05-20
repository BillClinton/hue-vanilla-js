const Store = {
  lights: {},
};

const proxyStore = new Proxy(Store, {
  set(target, prop, value) {
    target[prop] = value;
    if (prop === 'lights') {
      window.dispatchEvent(new Event('appdataloaded'));
    }
    return true;
  },
});

export default proxyStore;
