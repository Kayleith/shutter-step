ShutterStep.Views.FollowersListView = Backbone.CompositeView.extend({
  template: JST["followersModal"],
  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(model) {
      var followerView = new ShutterStep.Views.FollowerView({model: model});
      this.$(".user-followers-ul").append(followerView.render().$el);
    }.bind(this));
    return this;
  },
});
