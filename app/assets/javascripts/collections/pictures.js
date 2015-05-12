ShutterStep.Collections.Pictures = Backbone.Collection.extend({
  url: "/api/pictures/search",
  model: ShutterStep.Models.Picture,

  getOrFetch: function(id) {

  }
});
