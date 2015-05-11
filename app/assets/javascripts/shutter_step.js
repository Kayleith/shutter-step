window.ShutterStep = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new ShutterStep.Routers.MapRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  ShutterStep.initialize();
});
