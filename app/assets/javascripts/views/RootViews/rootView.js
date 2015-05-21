ShutterStep.Views.RootView = Backbone.View.extend({
  template: JST['rootView'],

  initialize: function() {
    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
    this._filterFeedView = new ShutterStep.Views.FilterFeedView({collection: this.collection});
    this._mapView = new ShutterStep.Views.MapView({collection: this.collection});
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.$(".root").html(this._headerView.render().$el);
    this.$(".root-filter-feed").html(this._filterFeedView.$el);
    this.$(".root-map").html(this._mapView.$el);
    this._mapView.initMap();
    this._filterFeedView.updateData();
    return this;
  },

  events: {
    "mouseenter li.picture-feed": "bouncePicture",
    "mouseleave li.picture-feed": "stopBouncePicture",
    "click li.picture-feed": "showPicture",
    "click .page-switch": "changePage"
  },

  bouncePicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id");
    this._mapView.startBounce(id);
  },

  stopBouncePicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id");
    this._mapView.stopBounce(id);
  },

  showPicture: function(event) {
    var id = $(event.currentTarget).find("a").data("id");
    this._mapView.zoom(1);
    this._mapView.showPicture(event, id);
  },

  changePage: function(event) {
    var text = $(event.currentTarget).text();
    this._mapView.resetMap();
    this._filterFeedView.$el.scrollTop(0);

    if(text === "<") {
      this._filterFeedView.leftPage();
    } else if(text === ">") {
      this._filterFeedView.rightPage();
    } else {
      this._filterFeedView.setPage(parseInt(text));
    }
    this._filterFeedView.updateData();
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this._mapView.remove();
    this._filterFeedView.remove();
    this._headerView.remove();
  }
});
