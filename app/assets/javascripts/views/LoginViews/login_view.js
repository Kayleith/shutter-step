ShutterStep.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    $(window).on("scroll", this.header.bind(this));
    // this.listenTo(ShutterStep.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit .sign-in-part-form": "signIn",
    "submit .sign-up-part-form": "signUp"
  },

  header: function() {
    if($(window).scrollTop() > 0) {
      this.$(".landing-page-logo").addClass("remove-border");
      this.$(".landing-page").addClass("landing-page-fixed");
      this.$(".landing-page").removeClass("landing-page");
    }
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
        this.cameraTransition();
      }.bind(this),
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
      success: this.cameraTransition.bind(this),
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  cameraTransition: function() {

    $(".top-block").addClass("off-stage-top");
    $(".bottom-block").addClass("off-stage-bottom");

    $(".top-block").addClass("animation-slidedown-start");
    $(".bottom-block").addClass("animation-slideup-start");

    $(".top-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        $(".top-block").removeClass("animation-slidedown-start");
        $(".top-block").addClass("animation-slideup");
        $(".top-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function () {
            $(".top-block").removeClass("animation-slideup");
          }
        );
      }
    );

    $(".bottom-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function () {
        Backbone.history.navigate("home", {trigger: true});
        $(".bottom-block").removeClass("animation-slideup-start");
        $(".bottom-block").addClass("animation-slidedown");
        $(".bottom-block").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function () {
            $(".bottom-block").removeClass("animation-slidedown");
          }
        );
      }
    );
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("home", { trigger: true });
    }
  }
});
