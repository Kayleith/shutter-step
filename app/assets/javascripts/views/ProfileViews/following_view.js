ShutterStep.Views.FollowingView = Backbone.CompositeView.extend({
  template: JST["followingView"],

  initialize: function() {
    this._page = 1;
    this.listenToOnce(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addFollow);
  },

  addFollow: function(model) {
    var followView = new ShutterStep.Views.FollowView({model: model});
    this.addSubview(".user-following-ul", followView);
  },

  loadData: function() {
    this.collection.fetch({
              remove: false,
              data: { page: this._page,
              id: this.model.id}
    });
  },

  render: function() {
    var content = this.template({following: this.collection});
    this.$el.html(content);
    return this;
  },

  events: {
    "click .menu-item": "showFollowing",
    "scroll #scroll-following": "loadNextPage"
  },

  loadNextPage: function(event) {
    if($("#scroll-following").height() + $("#scroll-following").scrollTop() === $(".user-following-ul").height()) {
      if(this._page <= this.collection.total_pages) {
        this._page = this._page + 1;
        this.loadData();
      }
    }
  },

  showFollowing: function(event) {
    this.$("#scroll-following").scroll(this.loadNextPage.bind(this));
    this.$(".modal-following").addClass("open");
  }
});
