ShutterStep.Views.SidebarView = Backbone.CompositeView.extend({
  template: JST["sidebarView"],
  initialize: function() {

    this._followers = new ShutterStep.Collections.Followers();
    this._following = new ShutterStep.Collections.Following();

    this._followingView = new ShutterStep.Views.FollowingView({model: this.model, collection: this._following});
    this.addSubview(".profile-nav", this._followingView);
    this._followersView = new ShutterStep.Views.FollowersView({model: this.model, collection: this._followers});
    this.addSubview(".profile-nav", this._followersView);

    this.listenTo(this.model, 'sync', this.render);
    $(window).on("keydown", this.closeProfile.bind(this));
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);

    if(ShutterStep.currentUser.following().get(this.model.id)) {
      this.$(".profile-picture button").text("Unfollow");
    }
    if(this.model.id === ShutterStep.currentUser.id) {
      this.$(".profile-picture button").addClass("hide-button");
    }
    this.attachSubviews();
    this._followingView.loadData();
    this._followersView.loadData();
    return this;
  },

  events: {
    "click #follow": "follow",
    "click .profile-picture img": "openProfile",
    "submit form.sendup-avatar-image": "submit",
    "change #input-avatar-image": "fileInputChange",
    "click .js-modal-close": "closeProfile2"
  },

  openProfile: function(event) {
    this.$(".modal").addClass("open");
  },

  closeProfile2: function(event) {
    if($(event.target)[0] === $("div.js-modal-close")[0]) {
      this.$(".modal").removeClass("open");
    }
  },

  closeProfile: function(event) {
    if(event.keyCode === 27) {
      this.$(".modal").removeClass("open");
      this.$(".modal-following").removeClass("open");
      this.$(".modal-followers").removeClass("open");
      // this.$("#scroll-following").off("**");
      // this.$("#scroll-followers").off("**");
    }
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
          this._followersView.loadData();
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
          this._followersView.loadData();
        }.bind(this)
      });
    }
  },

  submit: function(event){
    event.preventDefault();
    this.model.save({});
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
