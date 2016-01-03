document.addEventListener('DOMContentLoaded', function () {
            var names = document.getElementsByClassName('menuitemname');
            for (var i = 0, len = names.length; i < len; i++) {
                names[i].style.color = 'red';
            }
});