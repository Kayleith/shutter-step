ShutterStep.Views.FollowerView = Backbone.View.extend({
  template: JST['followerView'],
  tagName: 'li',
  className: 'user-follower-li',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({follower: this.model});
    this.$el.html(content);
    return this
  }
});
