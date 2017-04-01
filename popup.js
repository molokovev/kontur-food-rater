var store = {
  clean: function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.remove(Object.keys(store.obj), function () {
        chrome.runtime.sendMessage({event: 'ClearAll'});
        resolve();
      });
    });
  },
  copyAndSort: function (obj) {
    store.obj = obj;
    for (var item in store.obj) {
      store.sortedArray.push(item);
    }
    store.sortedArray.sort();
  },
  getSavedObj: function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get(null, function (items) {
        // for old storing scheme
        if (items[store.keyName]) {
          store.obj = items[store.keyName];
          chrome.storage.sync.remove(store.keyName);
        } else {
          store.obj =  items || {};
        }
        resolve(store.obj);
      });
    });
  },
  obj: {},
  keyName: 'konturFoodRater',
  removeItemRating: function (key) {
    delete store.obj[key];
    chrome.storage.sync.remove(key);
    chrome.runtime.sendMessage({event: 'ResetRate', name: key});
  },
  sortedArray: [],
};

var dom = {
  createRow: function (key, val) {
    var row = document.createElement('tr');

    var nameCell = document.createElement('td');
    nameCell.textContent = key;
    row.appendChild(nameCell);

    var ratingCell = document.createElement('td');
    ratingCell.textContent = val;
    row.appendChild(ratingCell);

    var removeCell = document.createElement('td');
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Удалить';
    link.addEventListener('click', function (e) {
      e.preventDefault();
      store.removeItemRating(key);
      row.remove();
    });
    removeCell.appendChild(link);
    row.appendChild(removeCell);

    return row;
  },
  renderTable: function () {
    var table = document.getElementById('table');

    store.sortedArray.forEach(function (currentValue) {
      var row = dom.createRow(currentValue, store.obj[currentValue]);
      table.appendChild(row);
    });
  },
};

store.getSavedObj()
  .then(function (obj) {
    store.copyAndSort(obj);
    dom.renderTable();
  });

document.getElementById('clearAll').addEventListener('click', function (e) {
  e.preventDefault();

  store.clean()
    .then(function () {
      window.close();
    });
});

chrome.runtime.sendMessage({event: 'OpenPopup'});
