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
    },

    joinUser: function (userName) {
        this.socket.emit("user:login", userName);
    },

    quitUser: function(){
        this.socket.emit("user:logout");
    }
});