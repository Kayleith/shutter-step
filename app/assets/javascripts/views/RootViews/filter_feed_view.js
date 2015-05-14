ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],

  initialize: function() {
   this._page = 1;
   this._mapView = new ShutterStep.Views.MapView({collection: this.collection, parent: this});
   this.listenTo(this.collection, 'sync', this.addPictures);
   this.listenTo(this.collection, 'remove', this.removePicture);
  },

  startData: function() {
    this.collection.fetch({
      remove: false, // merge this page with the rest of the collection
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
    "scroll": "scrolling"
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
  },

  scrolling: function(event) {
    if(this.$el.scrollTop() + this.$el.height() > this.$(".root-filter-feed-item").height()) {
      if(this._page === this.collection.total_pages) {
        this.$el.scrollTop(0);
      } else {
        this._page++;
      }
      this._mapView.zoom(2);
      this.updateData();
    }
  },

  updateData: function() {
    this.collection.fetch({
      remove: false, // merge this page with the rest of the collection
      data: { page: this._page },
      success: function(data) {
        debugger;
        this.$el.append(JST['filterFeedView']({pictures: this.collection}))
      }.bind(this)
    });
  }
});
