ShutterStep.Collections.Pictures = Backbone.Collection.extend({
  url: "/api/pictures",
  model: ShutterStep.Models.Picture,

  getOrFetch: function(id) {

  }
});
