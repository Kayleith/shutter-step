ShutterStep.Views.FollowersView = Backbone.CompositeView.extend({
  template: JST["followersView"],

  initialize: function() {
    this._followers_list = new ShutterStep.Views.FollowersListView({collection: this.collection, model: this.model});
    this.addSubview(".follower-modal-anchor", this._followers_list);
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
    var content = this.template({followers: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  events: {
    "click .menu-item": "showFollowers"
  },

  loadNextPage: function(event) {
    if($("#scroll-followers").height() + $("#scroll-followers").scrollTop() >= $(".user-followers-ul").height() - 100) {
      if(this._followers_list._page <= this.collection.total_pages) {
        this._followers_list._page = this._followers_list._page + 1;
        this._followers_list.loadData();
      }
    }
  },

  showFollowers: function(event) {
    this.$("#scroll-followers").scroll(this.loadNextPage.bind(this));
    this.$(".modal-followers").addClass("open");
    this.$(".modal-screen-followers").addClass("coolmodalzoom");
  }
});
