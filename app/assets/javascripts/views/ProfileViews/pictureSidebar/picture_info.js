ShutterStep.Views.PictureInfo = Backbone.CompositeView.extend({
  template: JST["pictureInfo"],
  tagName: "section",
  className: "picture-info",

  initialize: function (option) {
    this.user = option.user;
  },

  render: function () {
    var content = this.template({picture: this.model, user: this.user});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
