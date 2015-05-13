ShutterStep.Views.RootView = Backbone.CompositeView.extend({
  template: JST['rootView'],
  tagName: "section",
  className: "root-content",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    var filterFeedView = new ShutterStep.Views.FilterFeedView({collection: this.collection});
    this.addSubview(".root-filter-feed", filterFeedView);
    return this;
  }
});
