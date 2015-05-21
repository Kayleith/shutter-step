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

  initialize: function() {
    this._page = 1;
    this.listenTo(this.collection, "add", this.addFollower);
    this.listenTo(this.collection, "remove", this.removeFollower);
  },

  addFollower: function(model) {
    var followerView = new ShutterStep.Views.FollowerView({model: model});
    this.addSubview(".user-followers-ul", followerView);
  },

  removeFollower: function(model) {
    this.removeModelSubview(".user-followers-ul", model);
  },

  loadData: function() {
    this.collection.fetch({
              remove: false,
              data: { page: this._page,
              id: this.model.id}
    });
  }
});
