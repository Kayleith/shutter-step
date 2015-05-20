ShutterStep.Views.FollowView = Backbone.View.extend({
  template: JST['followView'],
  tagName: 'li',
  className: 'user-follow-li',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({follow: this.model});
    this.$el.html(content);
    return this
  }
});
