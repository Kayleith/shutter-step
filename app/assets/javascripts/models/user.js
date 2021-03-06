ShutterStep.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {user: _.clone(this.attributes)};

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  }
});

ShutterStep.Models.CurrentUser = ShutterStep.Models.User.extend({

  url: "/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

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

  parse: function (response) {
     if (response.followers) {
       this.followers().set(response.followers);
       delete response.followers;
     }
     if (response.following) {
       this.following().set(response.following);
       delete response.following;
     }
     return response;
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
