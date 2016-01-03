document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (url) {
        if (url === 'https://cafe.skbkontur.ru/') {
            var names = document.getElementsByClassName('menuitemname');
            for (var i = 0, len = names.length; i < len; i++) {
                names[i].style.color = 'red';
            }
        }

    }, function (errorMessage) {
        console.log(errorMessage);
    });
});

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}
