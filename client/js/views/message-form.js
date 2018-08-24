var TodoForm = Backbone.View.extend({
    events: {
        "click button": "save",
        "submit": "save"
    },

    template: function () {
        return "<form><input placeholder=\"Type your text here...\" name=\"description\" /><button >Send</button></form>";
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    save: function (e) {
        e.preventDefault();

        const message = this.$("input").val();

        Backbone.trigger("message:send", message);

        this.$("input").val("");
    }
});

export default TodoForm;