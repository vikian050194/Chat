import App from "./app";

$(document).ready(function () {
    var app = new App({el: document.body});
    app.render();
});