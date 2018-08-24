import UserView from "./user";

export default Backbone.View.extend({
    tagName: "div",
    
    template: function () {
        return "<h2>Users</h2>";
    },

    initialize: function () {
        Backbone.on("user:login", this.joinUser, this);
        Backbone.on("user:logout", this.quitUser, this);
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    joinUser: function (data) {
        this.$el.append(new UserView({ model: data })
            .render()
            .el);
    },

    quitUser: function (data) {
        this.$(`[data-user-name="${data.userName}"]`).remove();
    }
});