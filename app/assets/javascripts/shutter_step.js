window.ShutterStep = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    ShutterStep.pictures = new ShutterStep.Collections.Pictures();
    new ShutterStep.Routers.MapRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  ShutterStep.initialize();
});
