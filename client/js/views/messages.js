import MessageView from "./message";
import InfoView from "./info";

export default Backbone.View.extend({
    template: function () {
        return `<h2>Messages</h2>`;
    },

    initialize: function () {
        Backbone.on("message:new", this.addMessage, this);
    },

    render: function () {
        this.$el.html(this.template());

        return this;
    },

    addInfo: function (data) {
        this.$el.append(new InfoView({ model: data })
            .render()
            .el);
    },

    addMessage: function (data) {
        if(data.isInfo){
            this.addInfo(data);
        }else{
            this.$el.append(new MessageView({ model: data })
            .render()
            .el);
        }
    }
});