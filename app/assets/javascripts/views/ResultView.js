ShutterStep.Views.ResultView = Backbone.CompositeView.extend({
  template: JST['resultView'],
  tagName: "li",
  className: "result",

  render: function() {
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this
  }
});
