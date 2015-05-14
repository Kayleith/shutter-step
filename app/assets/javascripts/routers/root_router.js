ShutterStep.Routers.RootRouter = Backbone.Router.extend({
  routes: {
    "": "root"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    var users = new ShutterStep.Collections.UsersSearch();
    this._headerView = new ShutterStep.Views.HeaderView({collection: users});
  },

  root: function() {
    var rootView = new ShutterStep.Views.RootView({collection: ShutterStep.pictures });
    this._swapView(rootView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
