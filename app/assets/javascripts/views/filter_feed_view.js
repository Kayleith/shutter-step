ShutterStep.Views.FilterFeedView = Backbone.CompositeView.extend({
  template: JST['filterFeedView'],

  initialize: function() {
    this.setElement(".root-filter-feed");
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({collection: this.collection});
    this.$el.html(content)
  }
});
