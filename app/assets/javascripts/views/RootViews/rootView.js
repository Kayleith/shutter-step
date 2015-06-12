ShutterStep.Views.RootView = Backbone.View.extend({
  template: JST['rootView'],

  initialize: function() {
    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
    this._filterView = new ShutterStep.Views.FilterView({collection: this.collection});
    this._filterFeedView = new ShutterStep.Views.FilterFeedView({collection: this.collection});
    this._mapView = new ShutterStep.Views.MapView({collection: this.collection, parent: this});
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.$(".root").html(this._headerView.render().$el);
    this.$(".root-filter-feed").html(this._filterFeedView.$el);
    this.$(".root-map").html(this._mapView.$el);
    this.$(".root-filter-options").html(this._filterView.render().$el);
    this.search();
    return this;
  },

  events: {
    "mouseenter li.picture-feed": "bouncePicture",
    "mouseleave li.picture-feed": "stopBouncePicture",
    "click li.picture-feed": "showPicture",
    "click .page-switch": "changePage",
    "click .picture-search": "search",
    "click .filter-option-checkbox-all":'clicked',
    "click .filter-option-checkbox":'unclicked'
  },

  clicked: function(event) {
    $(".filter-option-checkbox").prop('checked', false);
  },
  unclicked: function(event) {
    $(".filter-option-checkbox-all").prop('checked', false);
  },

  search: function(event) {
    if(!this._mapView._map) {
      this._mapView.initMap();
    }
    var options = $(".filter-options-checkboxes-cool").find('input:checked');
    var search = {};
    options.toArray().forEach(function(option) { search[$(option).data("options-id")] = $(option).data("options-id")});
    this._filterView.search(search);
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
      this._filterView.leftPage();
    } else if(text === ">") {
      this._filterView.rightPage();
    } else {
      this._filterView.setPage(parseInt(text));
    }
    this._filterView.updateData();
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this._mapView.remove();
    this._filterFeedView.remove();
    this._headerView.remove();
    this._filterView.remove();
  }
});
