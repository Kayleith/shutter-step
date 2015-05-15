ShutterStep.Views.UserSearchView = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.setElement(".root-user-search");
    this.render();
    this.listenTo(this.collection, 'sync', this.renderUsers);
    this.parent = options.parent;
    $(window).on("click", this.closeUsers);
  },

  events: {
    "keyup": "searchUsers",
    "focusin": "openUsers"
  },

  openUsers: function(event) {
    if (this.$el.val() != "") {
      $(".user-results").addClass("visible");
    }
  },

  closeUsers: function(event) {
    if(event && event.target.className === "root-user-search") {
      return;
    } else if(event && event.target.className === "user-results") {
      return;
    }
    $(".user-results").removeClass("visible");
  },

  searchUsers: function(event) {
    $(".user-results").addClass("visible");
    var query = this.$el.val();
    if (query === "") {
      this.parent.eachSubview(function (subview) {
        subview.remove();
      });
      $(".user-results").removeClass("visible");
      return;
    }
    this.collection.fetch({
      traditional: true,
      data: {query: query}
    });
  },

  renderUsers: function(event, users) {
    this.parent.eachSubview(function (subview) {
      subview.remove();
    });
    this.collection.each(function(user) {
      var resultView = new ShutterStep.Views.ResultView({parent: this, model: user});
      this.parent.addSubview(".user-results", resultView);
    }.bind(this))
  }
});
// scrolling: function(event) {
//   if(this.$el.scrollTop() + this.$el.height() >= this.$(".root-filter-feed-item").height()) {
//     if(this._page === this.collection.total_pages) {
//       this.$el.scrollTop(0);
//       return;
//     } else {
//       this._page++;
//     }
//     this.updateData();
//   }
// }
//
// updateData: function() {
//   this.collection.fetch({
//     data: { page: this._page },
//     success: function() {
//       this.$(".root-filter-feed-item").append(JST["replaceFeed"]({pictures: this.collection}));
//       // $(".results-number").replaceWith(JST["replaceFeed"]({pictures: this.collection}));
//     }.bind(this)
//   });
// }
