ShutterStep.Views.FollowersView = Backbone.CompositeView.extend({
  template: JST["followersView"],

  initialize: function() {
    this._page = 1;
    this.listenToOnce(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addFollower);
    this.listenTo(this.collection, "remove", this.removeFollower);
  },

  addFollower: function(model) {
    var followerView = new ShutterStep.Views.FollowerView({model: model});
    this.addSubview(".user-followers-ul", followerView);
  },

  removeFollower: function(model) {
    this.removeSubview(".user-followers-ul", model);
  },

  loadData: function() {
    this.collection.fetch({
              remove: false,
              data: { page: this._page,
              id: this.model.id}
    });
  },

  render: function() {
    var content = this.template({followers: this.collection});
    this.$el.html(content);
    this.collection.each(function(model) {
      var followerView = new ShutterStep.Views.FollowerView({model: model});
      this.$(".user-followers-ul").append(followerView.render().$el);
    }.bind(this));
    return this;
  },

  events: {
    "click .menu-item": "showFollowers",
    "scroll #scroll-followers": "loadNextPage"
  },

  loadNextPage: function(event) {
    if($("#scroll-followers").height() + $("#scroll-followers").scrollTop() >= $(".user-followers-ul").height()-20) {
      if(this._page <= this.collection.total_pages) {
        this._page = this._page + 1;
        this.loadData();
      }
    }
  },

  showFollowers: function(event) {
    this.$("#scroll-followers").scroll(this.loadNextPage.bind(this));
    this.$(".modal-followers").addClass("open");
  }
});
