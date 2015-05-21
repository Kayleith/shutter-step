ShutterStep.Views.PictureView = Backbone.View.extend({
  template: JST['pictureView'],
  tagName: 'li',
  className: 'user-picture-li',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({picture: this.model});
    this.$el.html(content);
    return this
  }
});
