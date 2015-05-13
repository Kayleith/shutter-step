ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],

  initialize: function() {
   this.listenTo(this.collection, 'add', this.addPicture);
   this.listenTo(this.collection, 'remove', this.removePicture);
   this._mapView = new ShutterStep.Views.MapView({collection: this.collection});
  },

  render: function() {
   var temp = this.template();
   this.$el.html(temp);
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
    "mouseout li.picture-feed": "stopBouncePicture",
    "click li.picture-feed": "showPicture"
  },

  bouncePicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id")
    this._mapView.startBounce(id);
  },

  stopBouncePicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id")
    this._mapView.stopBounce(id);
  },

  showPicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id")
    this._mapView.showPicture(event, id);
  }
});
