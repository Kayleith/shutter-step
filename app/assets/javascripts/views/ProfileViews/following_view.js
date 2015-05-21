ShutterStep.Views.FollowingView = Backbone.CompositeView.extend({
  template: JST["followingView"],

  initialize: function() {
    this._followingList = new ShutterStep.Views.FollowingListView({collection: this.collection, model: this.model});
    this.addSubview(".follow-modal-anchor", this._followingList);
  },

  loadData: function() {
    this.collection.fetch({
              remove: false,
              data: { page: 1,
              id: this.model.id},
              success: function() {
                this.render();
              }.bind(this)
    });
  },

  render: function() {
    var content = this.template({following: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  events: {
    "click .menu-item": "showFollowing"
  },

  loadNextPage: function(event) {
    if($("#scroll-following").height() + $("#scroll-following").scrollTop() >= $(".user-following-ul").height() - 100) {
      if(this._followingList._page <= this.collection.total_pages) {
        this._followingList._page = this._followingList._page + 1;
        this._followingList.loadData();
      }
    }
  },

  showFollowing: function(event) {
    this.$("#scroll-following").scroll(this.loadNextPage.bind(this));
    this.$(".modal-following").addClass("open");
  }
});
