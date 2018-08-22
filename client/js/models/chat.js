import io from "socket.io-client";

export default Backbone.Model.extend({
    initialize: function () {
        this.socket = io();

        this.socket.on("user:login", function (data) {
            Backbone.trigger("user:login", data);
        });

        this.socket.on("user:logout", function (data) {
            Backbone.trigger("user:logout", data);
        });

        this.socket.on("message:new", function (data) {
            Backbone.trigger("message:new", data);
        });
    },

    joinUser: function (userName) {
        this.socket.emit("user:login", userName);
    },

    quitUser: function(){
        this.socket.emit("user:logout");
    },

    sendNewMessage: function(newMessage){
        this.socket.emit("message:send", newMessage);
    }
});