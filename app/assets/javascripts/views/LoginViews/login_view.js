ShutterStep.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(ShutterStep.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit .sign-in-part-form": "signIn",
    "submit .sign-up-part-form": "signUp"
  },

  template: JST["loginWindow"],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  signUp: function(event){
    event.preventDefault();
  },

  signIn: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;
    debugger;
    ShutterStep.currentUser.signIn({
      name: formData.name,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }
});
