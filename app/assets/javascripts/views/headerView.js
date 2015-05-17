ShutterStep.Views.HeaderView = Backbone.CompositeView.extend({
  template: JST['headerView'],

  initialize: function() {
    this._userSearchView = new ShutterStep.Views.UserSearchView({parent: this, collection: this.collection});
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    "click .sign-out": "signOut"
  },

  signOut: function(event) {
    event.preventDefault();

    ShutterStep.currentUser.signOut(
      {
        success: function() {
          Backbone.history.navigate("", {trigger: true});
        }.bind(this)
      }
    );
  }
});
