ShutterStep.Views.UserView = Backbone.View.extend({
  tagName: "section",
  className: "user-profile",
  template: JST["userView"],
  initialize: function() {
    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
    // this.listenTo(this.model, "sync", this.render);
    this._sidebarView = new ShutterStep.Views.SidebarView({model: this.model});
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.$(".root").html(this._headerView.render().$el);
    this.$(".profile-content-sidebar").html(this._sidebarView.render().$el);
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this._headerView.remove();
    this._sidebarView.remove();
  }
});
