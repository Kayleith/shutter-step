ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],

  initialize: function() {
   this._page = 1;
   this.listenTo(this.collection, 'sync', this.addPictures);
   this.listenTo(this.collection, 'remove', this.removePicture);
  },

  updateData: function() {
    this.collection.fetch({
      data: { page: this._page },
      success: function() {
        this.render();
      }.bind(this)
    });
  },

  render: function() {
    var temp = this.template({pictures: this.collection});
    this.$el.html(temp);
    return this;
  },

  addPictures: function () {
    this.collection.each(function(picture) {
      var view = new ShutterStep.Views.FilterFeedViewItem({
        model: picture
      });
      this.addSubview('.root-filter-feed-item', view);
    }.bind(this));
  },

  removePicture: function (picture) {
    this.removeModelSubview('.root-filter-feed-item', picture);
  },

  events: {
    "mouseover li.picture-feed": "bouncePicture",
    "mouseout li.picture-feed": "stopBouncePicture",
    "click li.picture-feed": "showPicture",
    "click button": "changePage"
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
    this._mapView.zoom(2);
    this._mapView.showPicture(event, id);
  },

  changePage: function(event) {
    var text = $(event.currentTarget).text();
    // this._mapView.resetMap();
    this.$el.scrollTop(0);
    if(text === "<") {
      this._page = this._page - 1;
      this.updateData();
    } else if(text === ">") {
      this._page = this._page + 1;
      this.updateData();
    } else {
      this._page = parseInt(text);
      this.updateData();
    }
  }
});
