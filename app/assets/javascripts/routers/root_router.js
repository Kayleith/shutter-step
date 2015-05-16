ShutterStep.Routers.RootRouter = Backbone.Router.extend({

  initialize: function(options) {

    this.$rootEl = options.$rootEl;

    this.collection = ShutterStep.users;
    this.collection.fetch();
  },

  routes: {
    "": "signIn",
    "home": "root",
    "users/:id": "userProfile"
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var model = this.collection.model();

    var signInView = new ShutterStep.Views.SignIn({
      callback: callback,
      collection: this.collection,
      model: model
    });
    this._swapView(signInView);
  },

  root: function() {
    var callback = this.root.bind(this);
    ShutterStep.currentUser.fetch({
      success: function () {
        if (!this._requireSignedIn(callback)) { return; }

        this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
        var pictures = new ShutterStep.Collections.Pictures();
        var rootView = new ShutterStep.Views.RootView({collection: pictures});
        this._swapView(rootView);
      }.bind(this)
    });

  },

  userProfile: function(id) {
    var callback = this.userProfile.bind(this, id);
    ShutterStep.currentUser.fetch({
      success: function () {
        if (!this._requireSignedIn(callback)) { return; }

        this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});

        var user = this.collection.getOrFetch(id);
        user.fetch({
          success: function() {
            var userView = new ShutterStep.Views.UserView({model: user});
            this._swapView(userView);
          }.bind(this)
        });
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
  }
});
