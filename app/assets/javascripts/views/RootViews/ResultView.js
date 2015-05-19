ShutterStep.Views.ResultView = Backbone.CompositeView.extend({
  template: JST['resultView'],
  tagName: "li",
  className: "result",
  initialize: function(options) {
    this.parent = options.parent;
  },
  render: function() {
    var content = this.template({model: this.model});
    this.$el.html(content);
    return this;
  },

  events: {
    "click": "openProfile"
  },

  openProfile: function(event) {
    this.parent.closeUsers();
    this.parent.$(".root-user-search").val('');
    this.parent.searchUsers(event);
    Backbone.history.navigate("#users/" + this.model.id, {trigger: true});
  }
});
