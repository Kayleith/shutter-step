ShutterStep.Views.RootView = Backbone.CompositeView.extend({
  template: JST['rootView'],
  tagName: "section",
  className: "root-content group",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    var filterFeedView = new ShutterStep.Views.FilterFeedView({collection: this.collection});
    this.addSubview(".root-filter-feed", filterFeedView);
    var mapView = new ShutterStep.Views.MapView({collection: this.collection});
    this.addSubview(".root-map", mapView);
    mapView.initMap();
    filterFeedView.updateData();
    return this;
  }
});
