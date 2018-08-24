export default Backbone.View.extend({
    tagName: "p",

    template: function (data) {
        return `<label class="info">${data.userName} : ${data.message}</label>`;
    },

    render: function () {
        this.$el.html(this.template(this.model));
        return this;
    }
});