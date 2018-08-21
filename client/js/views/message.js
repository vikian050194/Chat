export default Backbone.View.extend({
    tagName: "p",

    template: function (data) {
        return `<label>
        <span>${data.user}</span>
        <span>${data.message}</span>
        </label>`;
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});