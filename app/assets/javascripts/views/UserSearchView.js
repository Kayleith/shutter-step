ShutterStep.Views.UserSearchView = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.setElement(".root-user-search");
    this.render();
    this.listenTo(this.collection, 'sync', this.renderUsers);
    this.parent = options.parent;
  },

  events: {
    "keyup": "searchUsers"
  },

  searchUsers: function(event) {
    var query = this.$el.val();
    if (query === "") {
      this.parent.eachSubview(function (subview) {
        subview.remove();
      });
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
    users.forEach(function(user) {
      var resultView = new ShutterStep.Views.ResultView({model: user});
      this.parent.addSubview(".user-results", resultView);
    }.bind(this))
  }
});
