import ChatModel from "./models/chat";
import ChatView from "./views/chat";

var App = Backbone.View.extend({
    initialize: function () {
        new ChatView({
            model: new ChatModel(),
            el: $("body")
        }).render();

        console.log(`App is started at ${(new Date()).toLocaleString()}`);
    },

    render: function () {
        return this;
    }
});

export default App;