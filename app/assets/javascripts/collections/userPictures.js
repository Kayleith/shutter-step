ShutterStep.Collections.UserPictures = Backbone.Collection.extend({
  url: "/api/pictures/showbyuser",
  model: ShutterStep.Models.Picture,

  getOrFetch: function(id) {
    var model = this.get(id);
    if(model) {
      return model;
    } else {
      model = new ShutterStep.Models.Picture({id: id});
      model.fetch();
    }
    return model;
  },
  parse: function(response) {
        this.page = response.page;
        this.total_pages = response.total_pages;
        this.pictures_total = response.pictures_total;
        // deal with any nested resources on response.models and return
        return response.models;
  }
});
