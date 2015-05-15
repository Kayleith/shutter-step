ShutterStep.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  followers: function () {
    if (!this._followers) {
      this._followers = new ShutterStep.Collections.Users();
    }

    return this._followers;
  },

  following: function () {
    if (!this._following) {
      this._following = new ShutterStep.Collections.Users();
    }

    return this._following;
  },

  pictures: function() {
    if (!this._pictures) {
      this._pictures = new ShutterStep.Collections.Pictures();
    }

    return this._pictures;
  },

  parse: function (response) {
    if (response.followers) {
      this.followers().set(response.followers);
      delete response.followers;
    }
    if (response.following) {
      this.following().set(response.following);
      delete response.following;
    }
    if (response.pictures) {
      this.pictures().set(response.pictures);
      delete response.pictures;
    }
    return response;
  }
})
