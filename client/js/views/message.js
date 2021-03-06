export default Backbone.View.extend({
    tagName: "p",

    template: function (data) {
        return `<label><span class="${data.isMe ? "user-current" : ""}">${data.userName}</span> : <span>${data.message}</span></label>`;
    },

    render: function () {
        this.$el.html(this.template(this.model));

        return this;
    }
});