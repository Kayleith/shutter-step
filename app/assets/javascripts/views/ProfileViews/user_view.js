ShutterStep.Views.UserView = Backbone.View.extend({
  tagName: "section",
  className: "user-profile",
  template: JST["userView"],
  initialize: function() {
    this._headerView = new ShutterStep.Views.HeaderView({collection: ShutterStep.searchusers});
    // this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.$(".root").html(this._headerView.render().$el);
    return this;
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this._headerView.remove();
  },

  events: {
    "submit form": "submit",
    "change #input-post-avatar": "fileInputChange"
  },

  submit: function(event){
    event.preventDefault();

    this.model.save({});
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that.model._avatar = reader.result;
      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete that.model._avatar;
      console.log(that.model);
    }
  }
});
