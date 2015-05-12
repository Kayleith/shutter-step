window.ShutterStep = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    ShutterStep.pictures = new ShutterStep.Collections.Pictures();
    ShutterStep.users = new ShutterStep.Collections.Users();

    new ShutterStep.Routers.RootRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  ShutterStep.initialize();
});
