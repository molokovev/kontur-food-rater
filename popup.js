var storeKeyName = 'konturFoodRater';
var itemsArr = [];
var itemsObj = {};

chrome.storage.sync.get(storeKeyName, function (items) {
  if (items[storeKeyName]) {
    copyAndSort(items[storeKeyName]);
    renderTable();
  }
});

document.getElementById('clearAll').addEventListener('click', function(e) {
  e.preventDefault();
  chrome.storage.sync.remove([storeKeyName], function() {
    sendReload();
    window.close();
  });
});

function copyAndSort(obj) {
  itemsObj = obj;
  for (var item in itemsObj) {
    itemsArr.push(item);
  }
  itemsArr.sort();
}

function renderTable() {
  var table = document.getElementById('table');

  itemsArr.forEach(function(currentValue) {
    var row = createRow(currentValue, itemsObj[currentValue]);
    table.appendChild(row);
  });
}

function createRow(key, val) {
  var row = document.createElement('tr');

  var firstCell = document.createElement('td');
  firstCell.textContent = key;
  row.appendChild(firstCell);

  var secondCell = document.createElement('td');
  secondCell.textContent = val;
  row.appendChild(secondCell);

  return row;
}

function sendReload() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'reload', function(response) {
      console.log(response.farewell);
    });
  });
}