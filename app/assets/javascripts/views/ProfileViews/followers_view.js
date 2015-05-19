ShutterStep.Views.FollowersView = Backbone.CompositeView.extend({
  template: JST["followersView"],
  initialize: function() {
    this.listenTo(this.collection, "add sync remove", this.render);
  },
  render: function() {
    var content = this.template({followers: this.collection});
    this.$el.html(content);
    return this;
  }
});
