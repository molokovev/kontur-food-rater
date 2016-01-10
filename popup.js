var store = {
  clean: function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.remove([store.keyName], function () {
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
      chrome.storage.sync.get(store.keyName, function (items) {
        resolve(store.obj = items[store.keyName] || {});
      });
    });
  },
  obj: {},
  keyName: 'konturFoodRater',
  removeItemRating: function (key) {
    delete store.obj[key];
    store.save();
    chrome.runtime.sendMessage({event: 'ResetRate', name: key});
  },
  save: function () {
    chrome.storage.sync.set({[store.keyName]: store.obj});
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
      contentPage.refresh();
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

var contentPage = {
  refresh: function() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'refresh', function (response) {
        console.log(response.farewell);
      });
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
      contentPage.refresh();
      window.close();
    });
});

chrome.runtime.sendMessage({event: 'OpenPopup'});