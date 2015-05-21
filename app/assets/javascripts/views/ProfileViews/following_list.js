ShutterStep.Views.FollowingListView = Backbone.CompositeView.extend({
  template: JST["followingModal"],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.collection.each(function(model) {
      var followView = new ShutterStep.Views.FollowView({model: model});
      this.$(".user-following-ul").append(followView.render().$el);
    }.bind(this));
    return this;
  },

  initialize: function() {
    this._page = 1;
    this.listenTo(this.collection, "add", this.addFollow);
    this.listenTo(this.collection, "remove", this.removefollow);
  },

  addFollow: function(model) {
    var followView = new ShutterStep.Views.FollowView({model: model});
    this.addSubview(".user-following-ul", followView);
  },

  removeFollow: function(model) {
    this.removeModelSubview(".user-following-ul", model);
  },

  loadData: function() {
    this.collection.fetch({
              remove: false,
              data: { page: this._page,
              id: this.model.id}
    });
  }
});
