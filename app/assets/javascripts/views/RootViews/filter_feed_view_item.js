ShutterStep.Views.FilterFeedViewItem = Backbone.View.extend({
  template: JST['filterFeedViewItem'],
  tagName: 'li',
  className: 'picture-feed',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this
  }
});
