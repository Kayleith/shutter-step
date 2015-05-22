ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],
  className: "group",
  initialize: function() {
   this.listenTo(this.collection, 'sync', this.setUpPictures);
   this.listenTo(this.collection, 'remove', this.removePicture);
  },

  render: function() {
    var temp = this.template({pictures: this.collection});
    this.$el.html(temp);
    return this;
  },

  setUpPictures: function () {
    this.render();
    this.eachSubview(function (subview) {
      subview.remove();
    });
    this.collection.each(function(model) {
      var view = new ShutterStep.Views.FilterFeedViewItem({
          model: model})
      this.addSubview('.root-filter-feed-item', view);
    }.bind(this))
  },

  removePicture: function (picture) {
    this.removeModelSubview('.root-filter-feed-item', picture);
  }
});
