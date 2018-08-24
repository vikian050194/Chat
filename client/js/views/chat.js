import UsersView from "./users";
import MessagesView from "./messages";
import MessageFormView from "./message-form";

export default Backbone.View.extend({
    events: {
        "click button.join": "onJoinClick"
    },

    template: function () {
        return "<button class=\"join\">Join</button>";
    },

    initialize: function () {
        window.addEventListener("beforeunload", () => {
            this.model.quitUser();
        });

        Backbone.on("message:send", this.sendNewMessage, this);
    },

    render: function () {
        this.$el.html(this.template());
        this.$el.append(new UsersView().render().el);
        this.$el.append(new MessagesView().render().el);
     
        return this;
    },

    onJoinClick: function () {
        let userName = prompt("What is your name?");

        if (userName === "") {
            return;
        }

        this.$("button.join").remove();
           
        this.model.joinUser(userName);

        this.$el.append(new MessageFormView().render().el);
    },

    sendNewMessage: function(newMessage){
        this.model.sendNewMessage(newMessage);
    }
});