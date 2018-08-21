import UsersView from "./users";

export default Backbone.View.extend({
    events: {
        "click button.join": "onJoinClick"
    },

    template: function () {
        return `<h1>Chat</h1>
        <button class="join">Join</button>`;
    },

    initialize: function () {
        window.addEventListener("beforeunload", (e) => {
            this.model.quitUser();
        });
    },

    render: function () {
        this.$el.html(this.template());
        this.$el.append(new UsersView().render().el);

        return this;
    },

    onJoinClick: function () {
        let userName = prompt("What is you name?");

        if (userName == null) {
            return;
        }

        this.$("button.join").hide();
        this.model.joinUser(userName);
    }
});