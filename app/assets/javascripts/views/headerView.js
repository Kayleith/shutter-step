ShutterStep.Views.HeaderView = Backbone.CompositeView.extend({
  template: JST['headerView'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.renderUsers);
    $(window).on("click", this.closeUsers.bind(this));
  },

  render: function() {
    var content = this.template({currentuser: ShutterStep.currentUser});
    this.$el.html(content);
    return this;
  },

  events: {
    "click .sign-out": "signOut",
    "keyup .root-user-search": "searchUsers",
    "focusin .root-user-search": "openUsers"
  },

  openUsers: function(event) {
    if (this.$(".root-user-search").val() != "") {
      this.$(".user-results").addClass("visible");
    }
  },

  closeUsers: function(event) {
    if(event && event.target.className === "root-user-search") {
      return;
    } else if(event && event.target.className === "user-results") {
      return;
    }
    this.$(".user-results").removeClass("visible");
  },

  searchUsers: function(event) {
    this.$(".user-results").addClass("visible");
    var query = this.$(".root-user-search").val();
    if (query === "") {
      this.eachSubview(function (subview) {
        subview.remove();
      });
      $(".user-results").removeClass("visible");
      return;
    }
    this.collection.fetch({
      traditional: true,
      data: {query: query}
    });
  },

  renderUsers: function(event, users) {
    this.eachSubview(function (subview) {
      subview.remove();
    });

    this.collection.each(function(user) {
      var resultView = new ShutterStep.Views.ResultView({parent: this, model: user});
      this.addSubview(".user-results", resultView);
    }.bind(this))
  },

  signOut: function(event) {
    event.preventDefault();

    ShutterStep.currentUser.signOut(
      {
        success: function() {
          Backbone.history.navigate("", {trigger: true});
        }.bind(this)
      }
    );
  }
});
