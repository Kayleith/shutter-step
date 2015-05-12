ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],

  initialize: function() {
    this.setElement(".root-filter-feed");
    this.render();
    this.listenTo(this.collection, 'add', this.addPicture);
    this.listenTo(this.collection, 'remove', this.removePicture);
    this._mapView = new ShutterStep.Views.MapView({collection: this.collection});
  },

  render: function() {
    var content = this.template();
    this.$el.html(content)
    return this;
  },

  addPicture: function (picture) {
    var view = new ShutterStep.Views.FilterFeedViewItem({
      model: picture
    });
    this.addSubview('.root-filter-feed-item', view);
  },

  removePicture: function (picture) {
    this.removeModelSubview('.root-filter-feed-item', picture);
  },

  events: {
    "mouseover li.picture-feed": "bouncePicture",
    "mouseout li.picture-feed": "stopBouncePicture"
  },

  bouncePicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id")
    this._mapView.startBounce(id);
  },

  stopBouncePicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id")
    this._mapView.stopBounce(id);
  }
});
