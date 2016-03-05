"use strict";

(function ready(fn) {
  if (document.readyState != 'loading') {
    App.init;
  } else {
    document.addEventListener('DOMContentLoaded', App.init);
  }
})();
