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
    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON();
    var that = this;
    this.model.set(userData);
    
    this.model.save({}, {
      success: function(){
        ShutterStep.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      },
      error: function(data){
        alert("Form invalid. Let the user know what went wrong.");
        console.log(data);
      }
    });
  },

  signIn: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;
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
      Backbone.history.navigate("home", { trigger: true });
    }
  }
});
