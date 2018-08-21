export default Backbone.View.extend({
    tagName: "p",

    template: function (data) {
        return `<label class="user-${data.isMe ? "current" : "other"}" data-user-name="${data.userName}">${data.userName}</label>`;
    },

    render: function () {
        this.$el.html(this.template(this.model));

        return this;
    }
});