const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        Router.go(href);
      });
    });
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false);
    });
    // Process initial URL
    console.log(location.pathname);
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }
    let pageElement = null;
    switch (route) {
      case '/':
        console.log('root');
        pageElement = document.createElement('lights-panel');
        break;
      case '/lights':
        console.log('lights');
        pageElement = document.createElement('lights-panel');
        break;
      case '/rooms':
        pageElement = document.createElement('rooms-panel');
        break;
      default:
        pageElement = document.createElement('p');
        pageElement.innerText = '404 - Page not found';
        break;
    }
    if (pageElement) {
      document.querySelector('main').innerHTML = '';
      document.querySelector('main').appendChild(pageElement);
    }

    window.scrollX = 0;
  },
};

export default Router;
