var target = document.querySelector('#CateringWebPart_UpdatePanel3');

var observer = new MutationObserver(function (mutations) {

  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      refresh();
    }
  });
});

function refresh() {
  var names = document.getElementsByClassName('menuitemname');

  for (var i = 0, len = names.length; i < len; i++) {
    appendStarTo(names[i]);
  }
}

function appendStarTo(node) {
  node.style.position = 'relative';
  var star = document.createElement('div');
  star.setAttribute('class', 'star');
  node.appendChild(star);
}


var config = {childList: true};

observer.observe(target, config);

refresh();

