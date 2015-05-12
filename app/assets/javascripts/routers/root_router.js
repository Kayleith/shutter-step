ShutterStep.Routers.RootRouter = Backbone.Router.extend({
  routes: {
    "": "root"
  },

  root: function() {
    this._filterFeedView = new ShutterStep.Views.FilterFeedView({collection: ShutterStep.pictures});
    this._mapView = new ShutterStep.Views.MapView({collection: ShutterStep.pictures});
  }
});
