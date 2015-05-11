ShutterStep.Routers.MapRouter = Backbone.Router.extend({
  routes: {
    "": "map"
  },

  map: function() {
    this._mapView = new ShutterStep.Views.MapView({collection: ShutterStep.pictures});
  }
});
