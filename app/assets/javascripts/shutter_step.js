window.ShutterStep = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new ShutterStep.Models.CurrentUser();
    this.currentUser.fetch();

    ShutterStep.searchusers = new ShutterStep.Collections.UsersSearch();
    ShutterStep.users = new ShutterStep.Collections.Users();
    ShutterStep.pictures = new ShutterStep.Collections.Pictures();

    new ShutterStep.Routers.RootRouter({$rootEl: $(".currentView")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  ShutterStep.initialize();
});
