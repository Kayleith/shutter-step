ShutterStep.Views.HeaderView = Backbone.CompositeView.extend({
  template: JST['headerView'],

  initialize: function() {
    this.setElement(".root");
    this.render();
    this._userSearchView = new ShutterStep.Views.UserSearchView({parent: this, collection: this.collection});
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
