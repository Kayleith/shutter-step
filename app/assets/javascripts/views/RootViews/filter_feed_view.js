ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],

  initialize: function() {
   this._page = 1;
   this.listenTo(this.collection, 'sync add', this.addPictures);
   this.listenTo(this.collection, 'remove', this.removePicture);
  },

  leftPage: function() {
    this._page = this._page - 1;
  },

  rightPage: function() {
    this._page = this._page + 1;
  },

  setPage: function(page) {
    this._page = page;
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
  }
});
