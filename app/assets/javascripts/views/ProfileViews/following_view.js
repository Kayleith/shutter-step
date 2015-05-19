ShutterStep.Views.FollowingView = Backbone.CompositeView.extend({
  template: JST["followingView"],
  initialize: function() {
    this.listenTo(this.collection, "add sync remove", this.render);
  },
  render: function() {
    var content = this.template({following: this.collection});
    this.$el.html(content);
    return this;
  }
});
