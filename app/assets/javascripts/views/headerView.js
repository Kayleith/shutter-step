ShutterStep.Views.HeaderView = Backbone.CompositeView.extend({
  template: JST['headerView'],

  initialize: function() {
    this.setElement(".root");
    this.render();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content)
    return this;
  }
});
