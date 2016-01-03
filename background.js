//document.addEventListener('DOMContentLoaded', function () {
//    var names = document.getElementsByClassName('menuitemname');
//    for (var i = 0, len = names.length; i < len; i++) {
//        names[i].style.color = 'red';
//    }
//});


//document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.getCurrent(function(tab){
        chrome.pageAction.show(tab.id);
    })
//});