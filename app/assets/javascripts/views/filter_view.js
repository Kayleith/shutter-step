ShutterStep.Views.FilterView = Backbone.CompositeView.extend({
  template: JST[''],

  initialize: function() {
    this.render();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content)
    return this;
  }
});
