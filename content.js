var observer = {
  config: {
    childList: true
  },

  instance: new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        dom.refresh();
      }
    });
  }),
};

var dom = {
  addRateBlocks: function () {
    var names = document.getElementsByClassName('menuitemname');

    for (var i = 0, len = names.length; i < len; i++) {
      dom.appendRateBlockTo(names[i]);
    }
  },

  appendRateBlockTo: function (node) {
    node.parentNode.style.position = 'relative';

    var name = node.textContent;
    var rateBlock = dom.createRateBlock(name);
    node.parentNode.appendChild(rateBlock);
  },

  createRateBlock: function (name) {
    var input = document.createElement('input');
    input.setAttribute('class', 'rating');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('max', '5');

    input.addEventListener('change', function () {
      store.setRate(name, this.value);
    });

    input.value = store.getRate(name) !== '0' ? store.getRate(name) : '';

    return input;
  },

  observerTarget: document.querySelector('#CateringWebPart_UpdatePanel3'),

  refresh: function () {
    store.getSavedObj()
      .then(function () {
        dom.addRateBlocks();
      });
  },
};

var store = {
  clean: function () {
    chrome.storage.sync.remove([store.keyName]);
  },
  getRate: function (name) {
    return store.obj[name];
  },
  getSavedObj: function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get(store.keyName, function (items) {
        resolve(store.obj = items[store.keyName] || {});
      });
    });
  },
  keyName: 'konturFoodRater',
  obj: {},
  setRate: function (name, val) {
    store.obj[name] = val;
    chrome.storage.sync.set({[store.keyName]: store.obj});
  },
};

observer.instance.observe(dom.observerTarget, observer.config);
dom.refresh();