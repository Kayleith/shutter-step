ShutterStep.Routers.RootRouter = Backbone.Router.extend({

  initialize: function(options) {

    this.$rootEl = options.$rootEl;

    this.collection = ShutterStep.users;
  },

  routes: {
    "": "signIn",
    "home": "root",
    "users/:id": "userProfile"
  },

  signIn: function(callback) {
    $(window).off("**");
    ShutterStep.currentUser.fetch({
      success: function () {
        if (!this._requireSignedOut(callback)) { return; }

        var model = new ShutterStep.Models.User();

        var signInView = new ShutterStep.Views.SignIn({
          callback: callback,
          collection: this.collection,
          model: model
        });
        this._swapView(signInView);
      }.bind(this)
    });
  },

  root: function() {
    $(window).off("**");
    var callback = this.root.bind(this);
    ShutterStep.currentUser.fetch({
      success: function () {
        if (!this._requireSignedIn(callback)) { return; }

        var pictures = new ShutterStep.Collections.Pictures();
        var rootView = new ShutterStep.Views.RootView({collection: pictures});
        this._swapView(rootView);
      }.bind(this)
    });
  },

  userProfile: function(id) {
    $(window).off("**");
    var callback = this.userProfile.bind(this, id);
    var user = this.collection.getOrFetch(id);
    ShutterStep.currentUser.fetch({
      success: function () {
        if (!this._requireSignedIn(callback)) { return; }
        var userView = new ShutterStep.Views.UserView({model: user});
        this._swapView(userView);
      }.bind(this)
    });
  },

  _requireSignedIn: function(callback){
    if (!ShutterStep.currentUser.isSignedIn()) {
      callback = callback || this._goLogin.bind(this);
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
    Backbone.history.navigate("home", { trigger: true });
  },

  _goLogin: function() {
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  setCurrentView: function(view) {
    this._currentView = view;
  }
});
