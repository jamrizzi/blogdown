((document) => {
  'use strict';
  var app = document.getElementById('app');

  window.addEventListener('WebComponentsReady', function() {
    boot([
      'settings',
      'globals',
      'hooks',
      'meta',
      'pages',
      'taxonomies',
      'style',
      'theme'
    ]).then(() => {
      app.runHook('appLoaded');
    });
  });

  function boot(bootSteps) {
    var promises = [];
    _.each(bootSteps, (bootStep) => {
      promises.push(runBootStep.bind(this, bootStep));
    });
    var promiseChain = Promise.resolve();
    _.each(promises, (promise) => {
      promiseChain = promiseChain.then(promise);
    });
    return promiseChain.then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
    });
  }

  function runBootStep(bootStep) {
    var bootStepElement = document.createElement('boot-' + bootStep);
    return bootStepElement.init().then((res) => {
      return res;
    });
  }

  app.toastClicked = function() {
    if (!app.toastTarget) {
      app.toastTarget = '_self';
    }
    window.open(app.toastLink, app.toastTarget);
  };

  app.displayInstalledToast = function() {
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      console.log('caching disabled');
    } else {
      console.log('caching enabled');
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('DOM Ready');
  });
})(document);
