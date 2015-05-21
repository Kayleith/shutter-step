ShutterStep.Models.Picture = Backbone.Model.extend({
  urlRoot: "/api/pictures",

  toJSON: function() {
    // We want proper namespacing of our attributes in Rails.
    var json = {picture: _.clone(this.attributes)};

    if (this._image) {
      json.picture.image = this._image;
    }

    return json;
  }
});
