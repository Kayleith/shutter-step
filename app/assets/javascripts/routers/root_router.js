ShutterStep.Routers.RootRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "users/:id": "userProfile"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
  },

  root: function() {
    var rootView = new ShutterStep.Views.RootView({collection: ShutterStep.pictures });
    this._swapView(rootView);
  },

  userProfile: function(id) {
    var user = new ShutterStep.Models.User({id: id});
    user.fetch({
      success: function() {
        var userView = new ShutterStep.Views.UserView({model: user});
        this._swapView(userView);
      }.bind(this)
    });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
