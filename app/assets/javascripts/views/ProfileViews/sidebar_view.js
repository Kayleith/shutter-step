ShutterStep.Views.SidebarView = Backbone.CompositeView.extend({
  template: JST["sidebarView"],
  initialize: function() {
    this._followers = this.model.followers();
    this._following = this.model.following();
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    if(this._followers.get(ShutterStep.currentUser.id)) {
      this.$(".profile-picture button").text("Unfollow");
    }
    if(this.model.id === ShutterStep.currentUser.id) {
      this.$(".profile-picture button").addClass("hide-button");
    }
    var followingView = new ShutterStep.Views.FollowingView({collection: this._following});
    this.addSubview(this.$(".profile-nav"), followingView);
    var followersView = new ShutterStep.Views.FollowersView({collection: this._followers});
    this.addSubview(this.$(".profile-nav"), followersView);
    return this;
  },

  events: {
    "click #follow": "follow",
    "click .profile-picture img": "openProfile",
    "submit form.sendup-avatar-image": "submit",
    "change #input-avatar-image": "fileInputChange"
  },
  openProfile: function(event) {
    this.$(".modal").addClass("open");
  },

  follow: function(event) {
    event.preventDefault();
    if(this.$(".profile-picture button").text() === "Follow") {
      $.ajax({
        url: "/relationships",
        data: {followed_id: this.model.id},
        dataType: "json",
        method: "POST",
        success: function () {
          this.$(".profile-picture button").text("Unfollow");
          this._followers.add(ShutterStep.currentUser);
          ShutterStep.currentUser.following().add(this.model);
        }.bind(this)
      });
    } else if(this.$(".profile-picture button").text() === "Unfollow") {
      $.ajax({
        url: "/relationships",
        data: {id: this.model.id},
        dataType: "json",
        method: "DELETE",
        success: function () {
          this.$(".profile-picture button").text("Follow");
          this._followers.remove(ShutterStep.currentUser);
          ShutterStep.currentUser.following().remove(this.model);
        }.bind(this)
      });
    }
  },

  submit: function(event){
    event.preventDefault();
    this.model.save({}, {
      success: function() {
        alert("hi");
      }
    });
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that.model._avatar = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete that.model._avatar;
    }
  }
});
