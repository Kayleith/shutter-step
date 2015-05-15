ShutterStep.Routers.RootRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "root",
    "login": "signIn",
    "users/:id": "userProfile"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new ShutterStep.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  root: function() {
    var callback = this.root.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
    var rootView = new ShutterStep.Views.RootView({collection: ShutterStep.pictures });
    this._swapView(rootView);
  },

  userProfile: function(id) {
    var callback = this.userProfile.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
    var user = new ShutterStep.Models.User({id: id});
    user.fetch({
      success: function() {
        var userView = new ShutterStep.Views.UserView({model: user});
        this._swapView(userView);
      }.bind(this)
    });
  },

  _requireSignedIn: function(callback){
    if (!ShutterStep.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (ShutterStep.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function() {
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
