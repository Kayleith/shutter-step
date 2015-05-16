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

ShutterStep.Models.CurrentUser = ShutterStep.Models.User.extend({

  url: "/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[name]": options.name,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  }
});
