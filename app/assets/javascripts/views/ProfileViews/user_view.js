ShutterStep.Views.UserView = Backbone.CompositeView.extend({
  tagName: "section",
  className: "user-profile",
  template: JST["userView"],
  initiliaze: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  }
});
