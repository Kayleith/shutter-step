window.ShutterStep = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new ShutterStep.Models.CurrentUser();

    this.searchusers = new ShutterStep.Collections.UsersSearch();
    this.users = new ShutterStep.Collections.Users();

    this.router = new ShutterStep.Routers.RootRouter({$rootEl: $(".currentView")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  ShutterStep.initialize();
});
